


// Import express (to create APIs)
const express = require("express");

// Import cors (to allow frontend to talk to backend)
const cors = require("cors");

// Import database connection
const db = require("./db");

// Create express app
const app = express();

// Allow frontend requests
app.use(cors());

// Allow JSON data from frontend
app.use(express.json());

/* -------------------------
   REGISTER API
   URL: POST /register
-------------------------- */
app.post("/register", (req, res) => {
    console.log("Register API called");
  
    const username = req.body.username;
    const password = req.body.password;
  
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  
    db.query(sql, [username, password], (err, result) => {
  
      if (err) {
        console.error("DB ERROR:", err);   // 👈 CRITICAL
        return res.status(500).json({
          message: "Database error",
          error: err
        });
      }
  
      res.json({
        message: "User registered successfully",
        userId: result.insertId
      });
    });
  });
  
/* -------------------------
   LOGIN API
   URL: POST /login
-------------------------- */
app.post("/login", (req, res) => {
    console.log("Login API called");
  
    const username = req.body.username;
    const password = req.body.password;
  
    const sql = "SELECT * FROM users WHERE username=? AND password=?";
  
    db.query(sql, [username, password], (err, result) => {
  
      if (err) {
        console.error(err);
        return res.status(500).send("DB error");
      }
  
      if (result.length === 0) {
        return res.status(401).send("Invalid username or password");
      }
  
      res.json({
        id: result[0].id,
        username: result[0].username
      });
    });
  });
  
/* -------------------------
   CREATE TASK API
   URL: POST /task
-------------------------- */
app.post("/task", (req, res) => {
  const task = req.body.task;
  const user_id = req.body.user_id;

  const sql = "INSERT INTO tasks VALUES (NULL, ?, ?)";
  db.query(sql, [task, user_id], () => {
    res.send("Task Added");
  });
});

/* -------------------------
   VIEW TASKS API
   URL: GET /tasks/:id
-------------------------- */
app.get("/tasks/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM tasks WHERE user_id=?";
  db.query(sql, [userId], (err, result) => {
    res.send(result);
  });
});

/* -------------------------
   START SERVER
-------------------------- */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
