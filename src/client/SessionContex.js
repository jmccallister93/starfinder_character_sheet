//SessionContext
import { createContext } from "react";

const SessionContext = createContext({
    session: null,
    updateSession: () => {},
    // signOut: () => {},  // You might want to implement this later
});

export default SessionContext;
