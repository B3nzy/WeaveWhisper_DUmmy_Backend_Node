const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "weave_whisper",
});

mysqlConnection.connect((err) => {
  if (err) console.log(err.message);
  console.log("Connected to MysqlDB");
});

app.post("/api/signup", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Success" });
});

app.post("/api/signin", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    mysqlConnection.query(
      `SELECT * FROM user WHERE email="${email}"`,
      (err, data, fields) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          if (data.length === 0) {
            res.status(400).json({ message: "No such user exists" });
          } else if (password !== data[0].password) {
            res.status(400).json({ message: "Unauthorized" });
          } else {
            res.status(200).json({ message: "Success", userDetails: data[0] });
          }
        }
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});
