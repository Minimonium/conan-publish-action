import core from '@actions/core';
import github from '@actions/github';

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)

  console.log(github.context)
} catch (error) {
  core.setFailed(error.message);
}
