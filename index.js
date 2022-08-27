'use strict'

const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    const token = core.getInput('github-token');
    const lock = core.getInput('lock');
    const lock_reason = core.getInput('lock-reason');
    const number = core.getInput('number');

    const octokit = github.getOctokit(token);
    const context = github.context;

    if (lock)
    {
        await octokit.rest.issues.lock({
            lock_reason: lock_reason,
            ...context.repo,
            ...context.owner,
            issue_number: number,
            mediaType: {
                previews: [
                    'sailor-v'
                ]
            }
        })
    }
    else if (!lock)
    {
        await octokit.rest.issues.unlock({
            ...context.repo,
            ...context.owner,
            issue_number: number,
        })
    }
}

main().catch(err => core.setFailed(err.message))