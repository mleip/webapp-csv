const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
  const name = req.body.name;
  const alter = req.body.alter;
  const mobil = req.body.mobil;
  const email = req.body.email;
  const message = req.body.message;
  const csvData = `${name},${alter},${mobil},${email},${message}\n`;
  fs.appendFileSync("data.csv", csvData);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}.`);
});
