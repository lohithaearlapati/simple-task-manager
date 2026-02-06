const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "simple_task_app"
});

db.connect(() => {
  console.log("Database Connected");
});

module.exports = db;
