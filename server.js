const express = require("express");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter");
const server = express();

//global middleware
server.use(express.json());
// server.use(logger);

server.use("/api/users", logger, userRouter);
server.use("/api/posts", logger, postRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let date = new Date().toISOString();
  console.log(`A ${req.method} to ${req.url} occured at ${date} `);

  next();
}



module.exports = server;
