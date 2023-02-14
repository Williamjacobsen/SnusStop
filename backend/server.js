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

const createAccount = (req, res, userExists) => {
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

app.post("/Google", (req, res) => {
  let userExists = false;
  if (req.body.id) {
    db.query(
      `SELECT * FROM accounts WHERE google_id = ${req.body.id}`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.send({ status: "failure", message: null });
        } else if (result[0]) {
          userExists = true;
          console.log(`Account already exists with google_id ${req.body.id}`);
          res.send({ status: "success", message: "loggedIn" });
        } else {
          createAccount(req, res, userExists);
        }
      }
    );
  }
});

const insertUserData = (req, res) => {
  db.query(
    `UPDATE accounts SET money_per_week = ?, times_per_day = ?, program_type = ? WHERE google_id = '${req.body.googleID}'`,
    [
      parseInt(req.body.ugenligSnusOmkostninger),
      parseInt(req.body.snusPerDag),
      req.body.programType,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send({ status: "failure", message: null });
      } else {
        console.log(
          `Successfully inserted user data into account google_id = ${req.body.googleID}`
        );
        res.send({ status: "success", message: "UserDataInserted" });
      }
    }
  );
};

app.post("/UserData", (req, res) => {
  if (req.body.googleID) {
    db.query(
      `SELECT * FROM accounts WHERE google_id = ${req.body.googleID}`,
      (err, result) => {
        if (err) {
          console.error(err);
          res.send({ status: "failure", message: null });
        } else {
          insertUserData(req, res);
        }
      }
    );
  }
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));
