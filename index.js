const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const pdf = require("html-pdf");
const handlebars = require("handlebars");
const fs = require("fs");
const keys = require("./config/keys");

const app = express();
const port = process.env.PORT || 5000;

let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());

async function uploadToS3(body, filename) {
  AWS.config.update({
    accessKeyId: keys.awsAccessKeyId,
    secretAccessKey: keys.awsSecretAccessKey
  });

  const s3 = new AWS.S3();

  const params = {
    Body: body,
    ACL: "public-read",
    Bucket: keys.s3Bucket,
    Key: filename
  };

  try {
    const upload = await s3.upload(params).promise();
    return upload;
  } catch (error) {
    console.log(error);
    return res.end();
  }
}

app.post("/create-pdf", async (req, res) => {
  const data = req.body;
  const html = fs.readFileSync("template.html", "utf8");
  const template = handlebars.compile(html);
  const pdfInput = template(data);

  const filename = `nabidka.pdf`;

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

  try {
    await pdf.create(pdfInput, options).toStream(async function(err, stream) {
      if (err) return console.log(err);
      const result = await uploadToS3(stream, filename);
      res.status(201).send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//serve build folder if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // express will serve up the index.html if unknown route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
