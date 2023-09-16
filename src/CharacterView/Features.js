import { useEffect, useState } from "react";

const Features = ({character}) => {
    const [classFeatures, setClassFeatures] = useState()
    useEffect(() => {
        if(character?.features){
            setClassFeatures(JSON.parse(character.features))
        }
    }, [character])
    console.log(character.features)
    return ( <></> );
}
 
export default Features;