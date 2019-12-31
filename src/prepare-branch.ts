import {GitHub} from '@actions/github';
import promiseRetry from 'promise-retry';

export interface parameters {
  token: string;
  upstream: string;
  upstreamOwner: string;
  upstreamBranch: string;
  retries: number;
}

export async function createBranch(p: parameters) {
  return new Promise(async (resolve, reject) => {
    const octokit = new GitHub(p.token);

    // Ensure that we have a Fork
    const {data: repo} = await octokit.repos.createFork(
        {owner: p.upstreamOwner, repo: p.upstream});
    const fork =
        await promiseRetry(async (retry: any, number: number) => {
          console.log('Checking the fork readiness', number, '...')
          return octokit.repos.get({owner: repo.owner.login, repo: repo.name})
              .catch(retry);
        }, {retries: p.retries}).catch(err => {
          console.log('Failed to create a fork!', err);
          reject(err);
        });

    // Sync the Fork with the upstream
    // octokit.pulls.create({
    //   owner: repo.owner.login,
    //   repo: repo.name,
    //   title: 'sync',
    //   head: `${p.upstreamOwner}:${p.upstreamBranch}`,
    //   base: `${repo.owner.login}:${p.upstreamBranch}`
    // });

    resolve();
  });
}
