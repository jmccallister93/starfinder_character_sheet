import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home/>} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
