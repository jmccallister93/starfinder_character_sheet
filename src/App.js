import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CharacterCreate from "./pages/CharacterCreate";
import CharacterView from "./pages/CharacterView";
import SessionContext from "./client/SessionContex";
import { supabase } from "./client/supabaseClient";
import SessionProvider from "./client/SessionProvider";

function App() {
  const { session } = useContext(SessionContext);

  return (
    <SessionProvider >

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

      </SessionProvider>
  );
}

export default App;