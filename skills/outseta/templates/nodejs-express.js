const express = require("express");
var bodyParser = require("body-parser");
const { verifyOutsetaSignature } = require("./utils/verify-webhook");

const app = express();

const port = 8080;
const SIGNATURE_KEY = "E66AD9F85F4A0EB64F2DC4327A189410183A3B9DF8B65B210A4DFEAE5966A023";

app.get("/", (request, response) => {
  response.send("Hello Outseta World!");
});

app.post(
  "/a-webhook",
  // Get the json body as a string
  bodyParser.text({ type: "application/json" }),
  (request, response) => {
    const signature = request.headers["x-hub-signature-256"];

    if (!signature) {
      response.status(400).send("Missing signature header");
      return;
    }

    // Verify the signature
    const verified = verifyOutsetaSignature(signature, request.body, SIGNATURE_KEY);

    if (verified) {
      // Do what you need to do
      console.log("VERIFIED");

      // Send a 200 to stop Outseta from retrying
      response.status(200).send("ok");
    } else {
      response.status(400).send("Webhook Verification Error");
    }
  },
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
