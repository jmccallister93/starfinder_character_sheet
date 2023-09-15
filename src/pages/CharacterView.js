import { supabase } from "../client/supabaseClient";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const CharacterView = () => {
  const contextValue = useContext(SessionContext);
  const { session } = contextValue;
  const navigate = useNavigate();
  const isAuthenticated = !!session; 
  const { uuid } = useParams(); // Assuming you've set up routes with UUID
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Fetch character details from Supabase
    const fetchCharacter = async () => {
      const { data, error } = await supabase
        .from('DBCharacters')
        .select('*')
        .eq('id', uuid)
        .single();

      if (error) {
        console.error("Error fetching character:", error);
        return;
      }

      setCharacter(data);
    };

    fetchCharacter();
  }, [isAuthenticated, uuid]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display character details here */}
      <h1>{character.characterName}</h1>
      {/* Add more details as needed */}
    </div>
  );
}

export default CharacterView;
