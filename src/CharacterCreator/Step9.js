import { Box, Button, Heading, List, ListItem } from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";

const Step9 = ({ formData }) => {

    return (
        <Box padding="20px">
            <Heading marginBottom="20px">Confirm Character Creation</Heading>

            <Heading size="md" marginBottom="10px">Basic Details</Heading>
            <List>
                <ListItem><b>Name:</b> {formData.name}</ListItem>
                <ListItem><b>Race:</b> {formData.race.Name}</ListItem>
                <ListItem><b>Class:</b> {formData.class.Name}</ListItem>
                <ListItem><b>Theme:</b> {formData.theme.Name}</ListItem>
                <ListItem><b>Description:</b> {formData.description}</ListItem>
            </List>

            <Heading size="md" marginTop="20px" marginBottom="10px">Ability Scores</Heading>
            <List>
                {Object.entries(formData.scores).map(([key, value]) => (
                    <ListItem key={key}><b>{key}:</b> {value}</ListItem>
                ))}
            </List>

            <Heading size="md" marginTop="20px" marginBottom="10px">Skills</Heading>
            <List>
                {Object.entries(formData.skills).map(([key, value]) => (
                    <ListItem key={key}><b>{key}:</b> {value}</ListItem>
                ))}
            </List>

            <Heading size="md" marginTop="20px" marginBottom="10px">Inventory</Heading>
            <List>
                {formData.currentInventory.map((item, index) => (
                    <ListItem key={index}>{item.Name}</ListItem>
                ))}
            </List>

        </Box>
    );
}
 
export default Step9;
