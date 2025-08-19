const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const SECRET = "hardcodedsecret"; // weak secret

// Insecure users list
const users = [
  { id: 1, username: "alice", password: "plaintext123" },
  { id: 2, username: "bob", password: "password" }
];

// No authentication required
app.get("/users", (req, res) => {
  res.json(users);
});

// Weak JWT authentication
app.post("/login", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET, { algorithm: "HS256" });
  res.json({ token });
});

// Admin endpoint - no real auth
app.get("/admin", (req, res) => {
  res.send("Admin panel - access granted without proper checks!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Vulnerable API running on port ${port}`);
});
