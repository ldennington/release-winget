import github from '@actions/github'
import core from '@actions/core'

async function run(): Promise<void> {
  try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput('WINGET_TOKEN')

    const octokit = github.getOctokit(myToken)

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});
    console.log("got octokit");
    const {data: pullRequest} = await octokit.pulls.get({
      owner: 'octokit',
      repo: 'rest.js',
      pull_number: 123,
      mediaType: {
        format: 'diff'
      }
    })

    console.log(pullRequest)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
