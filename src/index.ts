import express from "express";
import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
const app = express();
const port = 8080;
const octokit = new Octokit();

type listUserRepoPullsParameters = Endpoints["GET /repos/{owner}/{repo}/pulls"]["parameters"];
type listUserRepoPullsResponse = Endpoints["GET /repos/{owner}/{repo}"]["response"];

app.get( "/", ( req, res ) => {
  // tslint:disable-next-line:no-console
  console.log(req)
  res.send( "Hello world!" );
});

app.get( "/owner/:owner/repos", async ( req, res ) => {
  res.send( "Work" );
});

app.get( "/owner/:owner/repos/:repo", async( req, res ) => {
    const response = await getOpenPullRequests(req.params.owner, req.params.repo)
    // tslint:disable-next-line:no-console
    console.log(response)
    res.send( "Work" );
});

app.get( "/owner/:owner/repos/:repo/commits", ( req, res ) => {
  res.send( "Work" );
});

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

// Returns info for open pull requests
async function getOpenPullRequests(owner: listUserRepoPullsParameters["owner"], repo: listUserRepoPullsParameters["repo"]) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'open'
  })
  // tslint:disable-next-line:no-console
  // console.log('response', response.data)

  response.data.forEach(pullRequest => {
     getCommitList(owner, repo, pullRequest.number)
  })
}

// Returns commit list (number of commits)
// tslint:disable-next-line:variable-name
async function getCommitList(owner: string, repo: string, pull_number: number) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
    owner,
    repo,
    pull_number,
  })

  // tslint:disable-next-line:no-console
  // console.log(response.data, response.data.length)
}