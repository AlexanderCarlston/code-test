import express from "express";
import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
const app = express();
const port = 8080;
const octokit = new Octokit();

type listUserRepoPullsParameters = Endpoints["GET /repos/{owner}/{repo}/pulls"]["parameters"];
type listUserRepoPullsResponse = Endpoints["GET /repos/{owner}/{repo}"]["response"];

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
});

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});


async function getOpenPullRequests(owner: listUserRepoPullsParameters["owner"], repo: listUserRepoPullsParameters["repo"]) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'open'
  })
  // tslint:disable-next-line:no-console
  console.log('response', response.data)

  response.data.forEach(pullRequest => {
     getCommitList(owner, repo, pullRequest.number)
  })
}

// tslint:disable-next-line:variable-name
async function getCommitList(owner: string, repo: string, pull_number: number) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
    owner,
    repo,
    pull_number,
  })

  // tslint:disable-next-line:no-console
  console.log(response)
}

// tslint:disable-next-line:no-console
console.log(getOpenPullRequests('AlexanderCarlston', 'fool-project'))