const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("pdf-creator-node");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;
const html = fs.readFileSync("template.html", "utf8");

let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(express.static("offers"));

app.post("/create-pdf", async (req, res) => {
  const data = req.body;

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "8mm",
    footer: {
      height: "16mm",
      contents: {
        default: `<p style='font-family: "Roboto", sans-serif!important; text-align: center;border-top: 1px solid #adadad; font-size: 12px; line-height: 32px;'>${data.offerFooter}</p>`
      }
    }
  };

  const document = {
    html: html,
    data: data,
    path: "./offers/output.pdf"
  };

  try {
    const output = await pdf.create(document, options);

    res.status(201).send(output);
  } catch (error) {
    console.log(error);
  }
});

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets (main.js, main.css ....)
  app.use(express.static("client/build"));

  // express will serve up the index.html file if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
