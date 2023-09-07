// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { supabase } from "../client/supabaseClient"; // Assuming this is the correct path

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [session, setSession] = useState(() => {
//     const storedSession = localStorage.getItem('session');
//     return storedSession ? JSON.parse(storedSession) : null;
//   });

//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (event, newSession) => {
//         if (event === "SIGNED_IN" || event === "USER_UPDATED") {
//           setSession(newSession);
//           localStorage.setItem("session", JSON.stringify(newSession));
//         } else if (event === "SIGNED_OUT") {
//           setSession(null);
//           localStorage.removeItem("session");
//         }
//       }
//     );

//     return () => {
//       authListener.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, setSession }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
