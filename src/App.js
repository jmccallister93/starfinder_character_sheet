import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CharacterCreate from "./pages/CharacterCreate";
import CharacterView from "./pages/CharacterView";

function App() {
  return (
    <AuthProvider>
      <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/characterCreate" element={<CharacterCreate />} />
            <Route path="/characterView" element={<CharacterView />} />
            <Route path="/" element={<Home/>} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;