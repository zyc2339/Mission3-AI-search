const express = require("express");
const cors = require("cors");
const port = 3100;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const DiscoveryV1 = require("ibm-watson/discovery/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Details for this found in the
const APIversion = "2019-04-30";
const apiKey = process.env.API_KEY;
const cloudURL = "https://api.eu-gb.discovery.watson.cloud.ibm.com";

// Environment ID and Collection ID specific to Discovery model trained
const envID = process.env.ENVIRONMENT_ID;
const collectionID = process.env.COLLECTION_ID;

const discovery = new DiscoveryV1({
  version: APIversion,
  authenticator: new IamAuthenticator({
    apikey: apiKey,
  }),
  serviceUrl: cloudURL,
});

// Basic endpoint to check connection is working on client-side
// Run getEnv or getCollections quickly here to test out
app.get("/", (req, res) => {
  /* getEnv();
      getCollections(); */
  res.status(200).send("Successfully connected to server !");
});

// Queries Watson Discovery model with parameters from client-side
// Response is sent back to the client in the FAQ module
app.post("/query", (req, res) => {
  const userQuery = req.body.queryText;

  const queryParams = {
    environmentId: envID,
    collectionId: collectionID,
    query: userQuery,
  };

  discovery
    .query(queryParams)
    .then((queryResponse) => {
      // console.log(JSON.stringify(queryResponse, null, 2));
      const discoResponse = JSON.stringify(queryResponse, null, 2);
      res.status(201).send(discoResponse);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log("express server running on port ", port));
