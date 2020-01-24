const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("pdf-creator-node");
const fs = require("fs");

const app = express();
const port = 5000;
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

app.listen(port, () => console.log(`Listening on port ${port}`));
