const express = require('express');
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const app = express();
app.use(express.json());

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Ensure Authentication Middleware
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const { user, error } = await supabase.auth.signUp({
    email: username,
    password: password,
  });

  if (error) {
    return res.status(400).send(error.message);
  }

  req.session.user = user;
  res.redirect('/dashboard');
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const { user, error } = await supabase.auth.signIn({
    email: username,
    password: password,
  });

  if (error) {
    return res.status(400).send(error.message);
  }

  req.session.user = user;
  res.redirect('/dashboard');
});

// Logout Route
app.post('/logout', async (req, res) => {
  await supabase.auth.signOut();
  req.session.user = null;
  res.redirect('/login');
});

// Dashboard Route
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send("Welcome to the dashboard!");
});

// ... (other routes and middleware)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});



