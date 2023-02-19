const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const os = require("os");

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
        > last_date_modified

      > datapoints
      -- Attributes --
        > id
        > account_id
        > date
        > amount
*/

require("dotenv").config();
const db = mysql.createConnection({
  user: os.type() === "Linux" ? "admin" : "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "snusstop",
});

/**
 * @returns {{year: [number, 0000], month: [number, '1-12'], day: [number, '1-31']}}
 */
const getDate = () => {
  // I HATE i18n
  let date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

/**
 * @returns {'year-month-day'}
 */
const stringifyedDate = (date) => {
  return `${date.year}-${date.month}-${date.day}`;
};

/**
 * @param {'stringifyedDate'} date
 * @returns {{year: [number, 0000], month: [number, '1-12'], day: [number, '1-31']}}
 */
const parseDate = (date) => {
  let obj = { year: null, month: null, day: null };
  date = date.split("-");
  obj.year = +date[0];
  obj.month = +date[1];
  obj.day = +date[2];
  return obj;
};

const getTomorrow = (date) => {
  if (date.day === 31) {
    date.day = 1;
    date.month += 1;
  } else if (date.month === 12) {
    date.day = 1;
    date.month = 1;
    date.year += 1;
  } else {
    date.day += 1;
  }
  return date;
};

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
          return;
        }
        console.log(`Successfully created account google_id: ${req.body.id}`);
        res.send({ status: "success", message: "newAccountCreated" });
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

const updateValue = (id, table, db_attribute, newValue) => {
  if (!id || !table || !db_attribute || !newValue)
    return "Missing param value...";
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE ${table} SET ${db_attribute} = ${newValue} WHERE id = ${id}`,
      (err, result) => {
        if (err) return reject(false) || console.error(err);
        return resolve(result);
      }
    );
  });
};

const handleUpdateValue = (res, account_id, table, db_attribute, newValue) => {
  return updateValue(account_id, table, db_attribute, newValue)
    .then((result) => {
      if (!result) res.send({ status: "failure", message: err });
    })
    .catch((err) => {
      console.error(err);
      res.send({ status: "failure", message: err });
    });
};

/**
 *
 * @param {Number} id
 * @param {String} google_id
 * @returns
 *
 * id
 *
 * google_id
 *
 * email
 *
 * verified_email
 *
 * name
 *
 * given_name
 *
 * family_name
 *
 * picture
 *
 * locale
 *
 * password
 *
 * money_per_week
 *
 * times_per_day
 *
 * program_type
 *
 * current_snus_amount
 *
 * total_snus_amount
 *
 * streak
 *
 * streak_last_date
 *
 * money_saved
 *
 * last_date_modified
 *
 */

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
  if (!req.body?.id) return;
  doesAccountExist(req.body.id).then((result) => {
    if (result) {
      console.log(`Account already exists with google_id = ${req.body.id}`);
      res.send({ status: "success", message: "loggedIn" });
      return;
    }
    createAccount(req, res);
  });
});

app.post("/UserData", (req, res) => {
  if (!req.body?.googleID) {
    return;
  }
  doesAccountExist(req.body.googleID).then((result) => {
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

app.post("/streak&money_saved", (req, res) => {
  if (req.body?.googleID) {
    getAccountValues(null, req.body.googleID)
      .then((values) => {
        if (
          stringifyedDate(getTomorrow(parseDate(values.last_date_modified))) ===
          stringifyedDate(getDate())
        ) {
          values.streak = values.streak + 1;
          return ["newStreak", values];
        }
        return [false, values];
      })
      .then((values) => {
        if (!values[1].streak) {
          res.send({ status: "failure", message: null });
          return false;
        }
        if (values[0] === "newStreak") {
          handleUpdateValue(
            res,
            values.id,
            "accounts",
            "streak",
            values.streak
          );
        }
        return values[1];
      })
      .then((result) => {
        if (result) {
          res.send({
            status: "success",
            message: null,
            streak: result.streak,
            money_saved: Math.round(
              (result.money_per_week / 7 / result.times_per_day) *
                result.total_snus_amount
            ),
          });
        }
      });
  }
});

app.post("/updateAntalSnusIDag", (req, res) => {
  console.log(req.body);

  // make state that checks if it have rendered - needs test
  if (!req.body?.isRendered) {
    getAccountValues(false, req.body.userInfo.id)
      .then((result) => {
        if (result.last_date_modified == stringifyedDate(getDate())) {
          if (
            result.current_snus_amount != null ||
            result.current_snus_amount != undefined ||
            result.current_snus_amount != 0
          ) {
            res.send({
              status: "success",
              message: "amount not matching",
              antalSnusIDag: result.current_snus_amount,
              nedsatAntalSnus:
                result.times_per_day - result.current_snus_amount,
            });
            return [true, result];
          }
        }
      })
      .then((result) => {
        console.log(result);
      });
    return;
  }

  doesAccountExist(req.body.userInfo.id).then((result) => {
    if (!result) res.send({ status: "failure", message: null });
    getAccountValues(false, req.body.userInfo.id)
      .then((result) => {
        if (result)
          return {
            id: result.id,
            antalSnusIDag: result.current_snus_amount,
            total_snus_amount: result.total_snus_amount,
            last_date_modified: result.last_date_modified,
            times_per_day: result.times_per_day,
          };
        res.send({ status: "failure", message: null });
      })
      .then((result) => {
        console.log(result);
        handleUpdateValue(
          res,
          result.id,
          "accounts",
          "current_snus_amount",
          !req.body.antalSnusIDag
            ? `'${req.body.antalSnusIDag}'`
            : req.body.antalSnusIDag
        );
        handleUpdateValue(
          res,
          result.id,
          "accounts",
          "total_snus_amount",
          result.last_date_modified != stringifyedDate(getDate()) &&
            result.last_date_modified != null
            ? `'${result.total_snus_amount}'`
            : req.body.antalSnusIDag > result.antalSnusIDag &&
              result.antalSnusIDag != null
            ? result.total_snus_amount + 1
            : req.body.antalSnusIDag == result.antalSnusIDag
            ? `'${result.total_snus_amount}'`
            : `'${result.total_snus_amount - 1}'`
        );
        handleUpdateValue(
          res,
          result.id,
          "accounts",
          "last_date_modified",
          `'${stringifyedDate(getDate())}'`
        );

        res.send({
          status: "success",
          message: "Successfully updated database",
          nedsatAntalSnus: result.times_per_day - req.body.antalSnusIDag,
        });
      });
  });
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));
