const express = require("express");
const mysql = require("mysql2");
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

/*
  -- Database --
    > snusstop
    -- Tables --
      > accounts
      -- Attributes --
        > id
        > google_id
        > email
        > verified_email
        > name
        > given_name
        > family_name
        > picture
        > locale
        > password
        > money_per_week
        > times_per_day
        > program_type
        > current_snus_amount
        > total_snus_amount
        > streak
        > streak_last_date
        > money_saved

      > datapoints
      -- Attributes --
        > id
        > account_id
        > date
        > amount
*/

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "snusstop",
});

const createAccount = (req, res) => {
  if (req.body.id) {
    db.query(
      `INSERT INTO accounts (google_id, email, verified_email, name, given_name, family_name, picture, locale, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body?.id ? req.body.id : null,
        req.body?.email ? req.body.email : null,
        req.body?.verified_email ? 1 : 0,
        req.body.name,
        req.body?.given_name ? req.body.given_name : null,
        req.body?.family_name ? req.body.family_name : null,
        req.body?.picture ? req.body?.picture : null,
        req.body?.locale ? req.body.locale : null,
        req.body?.password ? req.body.password : null,
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

const doesAccountExist = async (googleID) => {
  return new Promise((resolve, reject) => {
    if (!googleID) return reject(new Error("No google_id specified..."));
    db.query(
      `SELECT * FROM accounts WHERE google_id = ${googleID}`,
      (err, result) => {
        if (err) {
          console.error(err);
        } else if (result[0]) {
          return resolve("Successfully found account");
        }
        reject(new Error(`No account exists with google_id = ${googleID}`));
      }
    );
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const updateAccountValue = (id, db_attribute, newValue) => {
  console.log(id);
};

const getAccountValues = (id, google_id) => {
  if (id || google_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM accounts WHERE ${id ? "id" : "google_id"} = ${
          id ? id : google_id
        }`,
        (err, result) => {
          if (result[0]) {
            return resolve(result[0]);
          }
          reject(false);
        }
      );
    });
  }
};

app.post("/Google", (req, res) => {
  if (req.body?.id) {
    doesAccountExist(req.body.id).then((result) => {
      if (result) {
        console.log(`Account already exists with google_id = ${req.body.id}`);
        res.send({ status: "success", message: "loggedIn" });
        return;
      }
      createAccount(req, res);
    });
  }
});

app.post("/UserData", (req, res) => {
  if (!req.body?.googleID) {
    return;
  }
  doesAccountExist(req.body.id).then((result) => {
    if (result) {
      insertUserData(req, res);
      return;
    }
    console.log(
      `Account does not exist where google_id = ${req.body.googleID}`
    );
    res.send({ status: "failure", message: null });
  });
});

app.post("/updateAntalSnusIDag", (req, res) => {
  console.log(req.body);
  doesAccountExist(req.body.userInfo.id).then((result) => {
    if (result) {
      let account_id = null;
      getAccountValues(false, req.body.userInfo.id)
        .then((result) => {
          if (result) {
            return (account_id = result.id);
          }
          res.send({ status: "failure", message: null });
        })
        .then(() => {
          updateAccountValue(account_id, null, null);
        });
      res.send({ status: "success", message: null });
    } else {
      res.send({ status: "failure", message: null });
    }
  });
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));
