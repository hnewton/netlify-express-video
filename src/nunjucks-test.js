const express = require("express");
const serverless = require("serverless-http");
const nunjucks = require("nunjucks");

const app = express();

const router = express.Router();

var data = require("../data.json");

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.use("/public", express.static("public"));

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  var template = nunjucks.renderString(
    "<h1>{{ name }} from Express.js!</h1>",
    data
  );
  res.write(template);
  res.end();
});

router.get("/test", (req, res) => {
  res.render("index.html", data);
});

router.get("/simple", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  var template = nunjucks.renderString("<h1>{{ name }} from Express.js!</h1>", {
    name: "Ned"
  });
  res.write(template);
  res.end();
});

app.use("/.netlify/functions/nunjucks-test", router);

module.exports.handler = serverless(app);
