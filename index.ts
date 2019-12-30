import * as core from '@actions/core';
import * as github from '@actions/github';
import {createHash} from 'crypto';
import {get} from 'request-promise';

try {
  const tarball_url = github.context.payload.release.tarball_url;
  console.log('Tarball:', tarball_url);

  const options = {
    uri: tarball_url,
    headers: {'User-Agent': 'Conan-Publish-Action'},
  };
  var hasher = createHash('sha256');
  hasher.setEncoding('hex');
  get(options).pipe(hasher).on('finish', () => {
    console.log('Hash:', hasher.read());
  });
} catch (error) {
  core.setFailed(error.message);
}
