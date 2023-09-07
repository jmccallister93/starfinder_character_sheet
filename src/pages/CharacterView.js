import { supabase } from "../client/supabaseClient";
import spaceBackground from "../assets/space4.jpg";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

const CharacterView = (props) => {
    const contextValue = useContext(SessionContext);
    const { session } = contextValue;
    const navigate = useNavigate();
    const isAuthenticated = !!session; // Check if the session 
  
    useEffect(() => {
      if(!isAuthenticated){
        navigate("/");
      }
    }, [isAuthenticated])
    return ( <></> );
}
 
export default CharacterView;