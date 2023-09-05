const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "../.env" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

console.log("Backend Supabase URL:", process.env.SUPABASE_URL);
console.log("Backend Supabase Anon Key:", process.env.SUPABASE_ANON_KEY);

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your frontend application's URL
    credentials: true,
  })
);

// Ensure Authentication Middleware
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body; // Removed username

  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Registration error:", error);
    return res.status(400).send(error.message);
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  // Sign in user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error);
    res.status(401).json({ error: error.message });
  }

  console.log("Login successful");

  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

// Logout Route
app.post("/logout", async (req, res) => {
  await supabase.auth.signOut();
  req.session.user = null;
  res.redirect("/login");
});

// Dashboard Route
app.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send("Welcome to the dashboard!");
});

// ... (other routes and middleware)

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001/");
});
