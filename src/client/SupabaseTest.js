const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "../.env" });

const SUPABASE_URL='https://zyiwnpgbyyveqwhiusnw.supabase.co'
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5aXducGdieXl2ZXF3aGl1c253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NDQxMDQsImV4cCI6MjAwOTUyMDEwNH0.UFJcB6YxjU7WYCfDaEy6AMkQ1OzIVQ2Fb2cPdUdaiAs"


const supabase = createClient(
SUPABASE_URL,
  SUPABASE_ANON_KEY
);

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
  if (req.user && req.user.id) {
    return next();
  }

  res.redirect('/login');;
}

// Register Route
app.post('/register', async (req, res) => {

  const { email, password } = req.body;

  const {session, user, error } = await supabase.auth.signUp({
    email, 
    password
  });
  console.log("Login successful");
  console.log("User Data: ", user); // Log all the user data
  console.log("Session Data: ", session); // Log all session data

  if (error) {
    // Check for duplicate email error
    if (error.code === '23505') {
      return res.status(409).json({
        error: 'Email already registered'
      });
    } else {
      // Handle other errors
      console.error('Registration error:', error);
      return res.status(400).send(error.message);
    }
  }

  // Sign up succeeded
  res.json({message: 'Registration successful'}); 

});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" }); // Added return
  }

  // Sign in user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error);
    return res.status(401).json({ error: error.message }); // Added return
  }

  console.log("Login successful");

  return res.status(200).json({ // Added return
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
