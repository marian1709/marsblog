const express = require("express");
const app = express();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwtAuthz = require("express-jwt-authz");
const mongoose = require("mongoose");
const Task = require("./api/models/NewsModel");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Newsdb");

const getLoggerForStatusCode = statusCode => {
  if (statusCode >= 500) {
    return console.error.bind(console);
  }
  if (statusCode >= 400) {
    return console.warn.bind(console);
  }

  return console.log.bind(console);
};

const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);

  const cleanup = () => {
    res.removeListener("finish", logFn);
    res.removeListener("close", abortFn);
    res.removeListener("error", errorFn);
  };

  const logFn = () => {
    cleanup();
    const logger = getLoggerForStatusCode(res.statusCode);
    logger(
      `${res.statusCode} ${res.statusMessage}; ${res.get("Content-Length") ||
        0}b sent`
    );
  };

  const abortFn = () => {
    cleanup();
    console.warn("Request aborted by the client");
  };

  const errorFn = err => {
    cleanup();
    console.error(`Request pipeline error: ${err}`);
  };

  res.on("finish", logFn); // successful pipeline (regardless of its response)
  res.on("close", abortFn); // aborted pipeline
  res.on("error", errorFn); // pipeline internal error

  next();
};

// Enable CORS
app.use(cors());

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://marsbook.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: "http://localhost:3333", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://marsbook.eu.auth0.com/",
  algorithms: ["RS256"]
});

// Log things
app.use(logRequestStart);

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var routes = require("./api/routes/NewsRoutes"); //importing route
routes(app, checkJwt); //register the route

// Launch the API Server at localhost:8080
app.listen(3333);
