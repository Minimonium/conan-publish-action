import * as core from '@actions/core';
import * as github from '@actions/github';
import {createHash} from 'crypto';
import {get} from 'request-promise';

try {
  const tarball_url = github.context.payload.release.tarball_url;
  console.log(`The tarball: ${tarball_url}`);

  const options = {
    uri: tarball_url,
    method: 'GET',
    gzip: true,
    encoding: null,
    headers: {'User-Agent': 'Conan-Publish-Action'},
  };
  get(options).then(body => {
    let shasum = createHash('sha256');
    shasum.update(body);
    const hash = shasum.digest('hex');
    console.log(`${hash} ${tarball_url}`);
  });
} catch (error) {
  core.setFailed(error.message);
}
