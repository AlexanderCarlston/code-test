import express from "express";
import { getOpenPullRequestsForRepo } from "./services/repo-pulls";
const app = express();
const port = 8080;

app.get( "/", ( req, res ) => {
  res.send( "Hello world!" );
});

app.get( "/owner/:owner/repos/:repo/pulls", async( req, res ) => {
    const response = await getOpenPullRequestsForRepo(req.params.owner, req.params.repo)

    // tslint:disable-next-line:no-console
    console.log(response)

    res.send(response.data);
});

app.get( "/owner/:owner/repos/:repo/commits", ( req, res ) => {
  res.send( "Work" );
});

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

