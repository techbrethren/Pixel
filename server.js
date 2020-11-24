const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const schedule = require("node-schedule");
const urlMetadata = require("url-metadata");
const helmet = require("helmet");

const PORT = 3000;

let response;

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    if (response !== undefined) {
      data = data.replace(/\$OG_TITLE/g, response["og:title"]);
      data = data.replace(/\$OG_DESCRIPTION/g, response["og:description"]);
      data = data.replace(/\$OG_WEBSITE/g, response["og:type"]);
      data = data.replace(/\$OG_IMAGE/g, response["og:image"]);
      data = data.replace(/\$OG_SITENAME/g, response["site_name"]);
      let result = data.replace(/\$OG_URL/g, response["og:url"]);
      res.send(result);
    } else {
      res.send(data);
    }
  });
});

app.use(express.static(path.join(__dirname, "./build")));

app.get("*", (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`> Running on port ${PORT}`);
  getJSON();
});

var runner = schedule.scheduleJob("0 0 * * *", function () {
  getJSON();
  console.log(`Running job!`);
});

function getJSON() {
  urlMetadata("https://comeuntochrist.org").then(
    function (metadata) {
      response = metadata;
    },
    function (error) {
      console.log(error);
    }
  );
}
