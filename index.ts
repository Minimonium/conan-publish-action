import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  const tarball_url = github.context.payload.release.tarball_url;
  console.log(`The tarball: ${tarball_url}`);
} catch (error) {
  core.setFailed(error.message);
}
