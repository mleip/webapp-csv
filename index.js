const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Webseite mit CSV-Datei</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container mt-5">
          <h1>Hinterlasse mir eine Nachricht ich werde auch nicht Antworten</h1>
          <form method="post" action="/submit">
            <div class="form-group">
              <label for="name">Vor- Nachname:</label>
              <input type="text" class="form-control" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="name">Alter:</label>
              <input type="number" class="form-control" id="alter" name="alter" required>
            </div>
            <div class="form-group">
              <label for="name">Mobilnummer:</label>
              <input type="number" class="form-control" id="mobil" name="mobil" required>
            </div>
            <div class="form-group">
              <label for="email">E-Mail:</label>
              <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="message">Nachricht:</label>
              <textarea class="form-control" id="message" name="message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Senden</button>
          </form>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
    </html>
  `);
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
