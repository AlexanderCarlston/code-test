import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
const octokit = new Octokit();
type listUserRepoPullsParameters = Endpoints["GET /repos/{owner}/{repo}/pulls"]["parameters"];
type listUserRepoPullsResponse = Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"];
type listUserRepoPullCommitsParameters = Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"]["parameters"];
type listUserRepoPullCommitsResponse = Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"]["response"];
// Returns info for open pull requests
export async function getOpenPullRequestsForRepo(owner: listUserRepoPullsParameters["owner"], repo: listUserRepoPullsParameters["repo"]): Promise<listUserRepoPullsResponse> {
  return await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'open'
  })
}

// Returns commit list (number of commits)
// tslint:disable-next-line:variable-name
export async function getCommitList(owner: listUserRepoPullCommitsParameters["owner"], repo: listUserRepoPullCommitsParameters["repo"], pull_number: number): Promise<listUserRepoPullCommitsResponse> {
  return await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
    owner,
    repo,
    pull_number,
  })

}
