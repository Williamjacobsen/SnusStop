const express = require("express");
const mysql = require("mysql2"); // https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

app.use(
  cors({
    origin: ["*"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "snusstop",
});

const createAccount = (req, userExists) => {
  if (!userExists && req.body.id) {
    db.query(
      `INSERT INTO accounts (google_id, email, verified_email, name, given_name, family_name, picture, locale) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body.id,
        req.body.email,
        req.body.verified_email ? 1 : 0,
        req.body.name,
        req.body.given_name,
        req.body.family_name,
        req.body.picture,
        req.body.locale,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.send({ status: "failure", message: null });
        } else {
          console.log(`Successfully created account google_id: ${req.body.id}`);
          res.send({ status: "success", message: "newAccountCreated" });
        }
      }
    );
  }
};

app.post("/signIn", (req, res) => {
  let userExists = false;
  db.query(
    `SELECT * FROM accounts WHERE google_id = ${req.body.id}`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.send({ status: "failure", message: null });
      }
      if (result[0]) {
        userExists = true;
        console.log(`Account already exists with google_id ${req.body.id}`);
        res.send({ status: "success", message: "loggedIn" });
      } else {
        createAccount(req, userExists);
      }
    }
  );
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));