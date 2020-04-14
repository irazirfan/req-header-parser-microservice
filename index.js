"use strict";

//require packages that we need
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var api = require("./api/request.js");
const path = require('path');
//var api = set to the request.js file

//configuration for bodyParser();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(process.cwd() + "/public"));
app.enable("trust proxy");
//app.enable sets something to true or false
//in this case sets trust proxy to true, so we can use req.ip

var port = process.env.PORT || 8080;

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/api/whoami', (req, res, next) => {
  api(app);
});
//make sure we can use app instance in api (set to ./api/request.js) file

app.listen(port, function() {
  //create server

  console.log("Node.js listening on port " + port);
});
