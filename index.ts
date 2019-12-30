import * as core from '@actions/core';
import * as github from '@actions/github';
import {createHash} from 'crypto';
import {get} from 'request-promise';

try {
  const tarball_url = github.context.payload.release.tarball_url;
  console.log('The tarball: ${tarball_url}');

  let shasum = createHash('sha256');
  get({uri: tarball_url})
      .then(body => {
        shasum.update(body);
        const hash = shasum.digest('hex');
        console.log(tarball_url + ' ' + hash);
      })
      .catch(e => {
        console.log('error!');
      });
} catch (error) {
  core.setFailed(error.message);
}
