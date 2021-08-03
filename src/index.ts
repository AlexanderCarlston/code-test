import express from "express";
import { getOpenPullRequestsForRepo, getCommitList } from "./services/repo-pulls";
const app = express();
const port = 8080;

app.get( "/", ( req, res ) => {
  res.send( "Hello world!" );
});

// Returns info for open pull requests
app.get( "/owner/:owner/repos/:repo/pulls", async( req, res ) => {
  // TODO: Add params validation
  // TODO: add dynamic state and other properties
  try {
    const response = await getOpenPullRequestsForRepo(req.params.owner, req.params.repo);
    res.send(response.data);
  } catch(error) {
    res.sendStatus(error.status);
  }
});

// Returns commit list (number of commits)
app.get( "/owner/:owner/repos/:repo/pulls/:pullNumber", async( req, res ) => {
  // TODO: Add params validation
  try {
    const response = await getCommitList(req.params.owner, req.params.repo, parseInt(req.params.pullNumber, 10));
    res.send(response.data);
  } catch(error) {
    res.sendStatus(error.status);
  }
});

// TODO: possible url change github/:githubUrl
app.get("/github/owner/repos/pulls", async(req, res) => {
  // TODO: add required query params
  // if(req.query.url) {
  //   res.sendStatus(400)
  // }

  const url = new URL(req.query.url as string)
  // TODO: improve url parsing
  const urlParsed = url.pathname.split('/')
  try {
    const response = await getOpenPullRequestsForRepo(urlParsed[1], urlParsed[2]);
    res.send(response.data);
  } catch(error) {
    res.sendStatus(error.status);
  }
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

