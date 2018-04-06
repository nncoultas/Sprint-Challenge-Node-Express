const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const actionRouter = require("./Routers/actionRouter");
const projectRouter = require("./Routers/projectRouter");

const server = express();

function logger(req, res, next) {
  console.log(`requesting: ${req.url}`);

  next();
}

server.use(logger);
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", function(req, res) {
  res.send({ api: "Running!" });
});

const port = 5000;
server.listen(port, () => console.log("API Running on port 5000"));
