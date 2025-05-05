const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "54.85.99.156",
  user: "newuser",
  password: "password123",
  database: "endsem_project",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

// Route to handle signup
app.post("/signup", async (req, res) => {
  const { firstname, email, password } = req.body;

  try {
    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the 'users' table with hashed password
    const sql =
      "INSERT INTO users (firstname, email, password) VALUES (?, ?, ?)";
    db.query(sql, [firstname, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Signup failed" });
      }
      res.json({ message: "Signup successful!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error hashing password" });
  }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
//debug
app.get("/check-db", (req, res) => {
  db.ping((err) => {
    if (err) {
      return res.status(500).json({ connected: false });
    }
    res.json({ connected: true });
  });
});
