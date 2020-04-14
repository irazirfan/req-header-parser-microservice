const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/api/whoami', (req, res, next) => {

  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  res.json({
    ipaddress: ip,
    language: req.headers['accept-language'].split(',')[0],
    software: req.headers['user-agent'].split(') ')[0].split(' (')[1]
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(chalk.blue(`Contact from intelligent life received on port ${port}`));
});

app.use('/', (err, req, res, next) => {
  console.log(chalk.red('Whoops!, we have a problem.'));
  console.log(chalk.red(`ERROR: ${err.message}`));
  res.sendStatus(err.status || 500);
});