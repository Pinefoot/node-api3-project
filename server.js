const express = require('express');

const server = express();

//global middleware
server.use(express.json());

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let date = new Date().toISOString();
  console.log(`[${date}] ${req.method} to ${req.url}`)

  next();

}

module.exports = server;
