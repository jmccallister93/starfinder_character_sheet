import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CharacterCreate from "./pages/CharacterCreate";
import CharacterView from "./pages/CharacterView";
import { SessionContext } from "./client/SessionContex";
import { supabase } from "./client/supabaseClient";
import SessionProvider from "./client/SessionProvider";

function App() {
  const [session, setSession] = useState();

  // useEffect(() => {
  //   // Check for session data in cookie or local storage
  //   const storedSession = localStorage.getItem("session");
  //   if (storedSession) {
  //     setSession(JSON.parse(storedSession));
  //   }

  //   // Listen for changes to session state and update the context and storage
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, newSession) => {
  //       setSession(newSession);
  //       console.log(authListener)
  //       if (event === "SIGNED_IN") {
  //         localStorage.setItem("session", JSON.stringify(newSession));
  //       } else if (event === "SIGNED_OUT") {
  //         localStorage.removeItem("session");
  //       }
  //     }
  //   );
    
  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     if (authListener && authListener.unsubscribe) {
  //       authListener.unsubscribe();
  //     }
  //   };
    
  // }, []);

  useEffect(() => {
    console.log("Session from App: " + session)
  }, [session])

  return (
    <SessionProvider>

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