const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const urlMetadata = require("url-metadata");
const PORT = 3000;

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Home Page");
    data = data.replace(/\$OG_DESCRIPTION/g, "Home Page");
    data = data.replace(/\$OG_WEBSITE/g, "Home Page");
    data = data.replace(/\$OG_IMAGE/g, "Home Page");
    data = data.replace(/\$OG_SITENAME/g, "Home Page");
    let result = data.replace(/\$OG_URL/g, "Home Page");
    res.send(result);
  });
  //res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.use(express.static(path.join(__dirname, "./build")));
app.listen(PORT, () => {
  console.log(`> Running on PORT ${PORT}`);
});

function getJSON() {
  urlMetadata("https://comeuntochrist.org").then(
    function (metadata) {
      console.log(JSON.stringify(metadata));
    },
    function (error) {
      console.log(error);
    }
  );
}
