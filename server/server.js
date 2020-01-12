const fs = require('fs');
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');
const routes = require('./src/routes/index');

// BEGIN: Authentication setup
const userWhitelist = require('./src/middleware/secret/userWhitelist.json');

app.use(basicAuth({
  users: userWhitelist,
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse
}));

function getUnauthorizedResponse(req) {
  return req.auth 
    ? {
        'source': 'SECURITY', 
        'message': 'USERNAME: ' + req.auth.user + ', OR PASSWORD INVALID.'
    } : {
        'source': 'SECURITY', 
        'message': 'NO BASIC AUTH CREDENTIALS PROVIDED IN REQUEST HEADER.'
      }
}
// END: Authentication setup

// BEGIN: API ssl and ports setup
app.use(routes);

const httpPort = 3000;
const httpsPort = 8443;

const http = require('http');
const https = require('https');

const pass = process.argv[2];

const privateKey = fs.readFileSync('./src/middleware/sslcert/key.pem');
const certificate = fs.readFileSync('./src/middleware/sslcert/cert.pem');

const credentials = {key: privateKey, cert: certificate, passphrase: pass};
// END: API ssl and ports setup

// Startup API on both secure and unsecure ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(httpPort, () => console.log('Example app listing unsecured on port: ' + httpPort));
httpsServer.listen(httpsPort, () => console.log('Example app listing secured on port: ' + httpsPort));