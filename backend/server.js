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

app.post("/signIn", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));
