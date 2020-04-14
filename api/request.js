"use strict";

module.exports = function(app) {
  var accepts = require("accepts");
  //load accepts module to parse accept-language string req http header
  //.languages methods returns an array in the order of clients preferences

  var uaParser = require("ua-parser");
  //load ua-parser module that uses regex library to parse user agent strings in req http header
  //Added app.enable('trust proxy') to server.js app intialization code to maket this work

  app.get("/", function(req, res) {
    var ip = req.ip;
    //get ip address with express build-in method req.ip

    var language = accepts(req).languages()[0];
    //get an array of preferred languages from http req headers, and take the first one, which is most preferred language

    var uaHeader = req.headers["user-agent"];
    //get user-agent string

    var agent = uaParser.parseOS(uaHeader).toString();
    //parse OS part of user-agent string to a string

    res.json({ ipaddress: ip, language: language, software: agent });
  });
};
