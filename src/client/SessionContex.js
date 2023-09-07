//SessionContext
import { createContext } from "react";

export const SessionContext = createContext({
    session: null,
    updateSession: () => {},
    signOut: () => {},
  });
  
  console.log("Session Context from Session Context: " + SessionContext)