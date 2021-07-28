import express from "express";
const app = express();
const port = 8080; // default port to listen
const { Octokit } = require("@octokit/core");
const octokit = new Octokit();

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );


async function test() {
  const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: 'octocat',
    repo: 'hello-world'
  })

  console.log(response)
}

test()