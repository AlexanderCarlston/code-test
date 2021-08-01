import express from "express";
import { getOpenPullRequestsForRepo, getCommitList } from "./services/repo-pulls";
const app = express();
const port = 8080;

app.get( "/", ( req, res ) => {
  res.send( "Hello world!" );
});

app.get( "/owner/:owner/repos/:repo/pulls", async( req, res ) => {
  // TODO: Add params validation
  try {
    const response = await getOpenPullRequestsForRepo(req.params.owner, req.params.repo);
    res.send(response.data);
  } catch(error) {
    res.sendStatus(error.status);
  }
});

app.get( "/owner/:owner/repos/:repo/pulls/:pullNumber", async( req, res ) => {
  // TODO: Add params validation
  try {
    const response = await getCommitList(req.params.owner, req.params.repo, parseInt(req.params.pullNumber, 10));
    res.send(response.data);
  } catch(error) {
    res.sendStatus(error.status);
  }
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

