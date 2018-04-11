const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://marsbook.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3333',
    issuer: "https://marsbook.eu.auth0.com/",
    algorithms: ['RS256'],
});

module.exports = function (scopes) {
  const scopesGuard = jwtAuthz(scopes || []);
  return function mid(req, res, next) {
    jwtCheck(req, res, (err) => {
      err ? res.status(500).send(err) : scopesGuard(req, res, next);
    });
  }
};