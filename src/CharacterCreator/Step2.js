import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import DetailsModal from "./DetailsModal";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";

const Step2 = ({ setFormData, formData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalOptions, setModalOptions] = useState([]);

  const handleButtonClick = (type, options) => {
    setSelectedOption(type);
    setModalOptions(options);
    onOpen();
  };

  const handleModalSelect = (value) => {
    setFormData(selectedOption, value);
    onClose();
  };

  const fetchData = async () => {
    const categories = ["classes", "races", "themes"];

    const results = await Promise.all(
      categories.map((category) => supabase.from(category).select("*")) // Change "Name" to "*" to fetch all columns
    );

    const data = {};

    results.forEach((result, index) => {
      const category = categories[index];
      if (result.error) {
        console.error(`Error fetching ${category}:`, result.error);
        data[category] = [];
      } else {
        data[category] = result.data;
      }
    });

    return data;
  };

  const [data, setData] = useState({
    classes: [],
    races: [],
    themes: [],
  });

  const [classDetails, setClassDetails] = useState({});
  const [raceDetails, setRaceDetails] = useState({});
  const [themeDetails, setThemeDetails] = useState({});

  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData(fetchedData);

      // Create an object with class names as keys and their details as values
      const classDetailsObj = {};
      fetchedData.classes.forEach((cls) => {
        classDetailsObj[cls.Name] = cls;
      });
      setClassDetails(classDetailsObj);

      // Do the same for races
      const raceDetailsObj = {};
      fetchedData.races.forEach((race) => {
        raceDetailsObj[race.Name] = race;
      });
      setRaceDetails(raceDetailsObj);

      // And for themes
      const themeDetailsObj = {};
      fetchedData.themes.forEach((theme) => {
        themeDetailsObj[theme.Name] = theme;
      });
      setThemeDetails(themeDetailsObj);
    });
  }, []);

  // const fetchData = async () => {
  //   let { data: classesData, error: classError } = await supabase.from("classes").select("Name");
  //   if (classError) console.error("Error fetching classes:", classError);

  //   let { data: racesData, error: raceError } = await supabase.from("races").select("Name");
  //   if (raceError) console.error("Error fetching races:", raceError);

  //   let { data: themesData, error: themeError } = await supabase.from("themes").select("Name");
  //   if (themeError) console.error("Error fetching themes:", themeError);

  //   return {
  //     classes: classesData ? classesData.map(item => item.Name) : [],
  //     races: racesData ? racesData.map(item => item.Name) : [],
  //     themes: themesData ? themesData.map(item => item.Name) : []
  //   };
  // };

  // const [data, setData] = useState({
  //   classes: [],
  //   races: [],
  //   themes: []
  // });

  // useEffect(() => {
  //   fetchData().then(fetchedData => setData(fetchedData));
  // }, []);

  
  return (
    <Box color="white" background="grey">
      <Text fontSize="2rem" textAlign="center" fontWeight="bold">
        Step 2
      </Text>
      <FormControl id="race" mb={4}>
        <FormLabel>Race</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(
              "race",
              data.races.map((race) => race.Name)
            )
          }
        >
          Select Race
        </Button>

        <Text mt={2}>{formData.race}</Text>
      </FormControl>

      <FormControl id="theme" mb={4}>
        <FormLabel>Theme</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(
              "theme",
              data.themes.map((theme) => theme.Name)
            )
          }
        >
          Select Theme
        </Button>

        <Text mt={2}>{formData.theme}</Text>
      </FormControl>

      <FormControl id="class" mb={4}>
        <FormLabel>Class</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(
              "class",
              data.classes.map((cls) => cls.Name)
            )
          }
        >
          Select Class
        </Button>

        <Text mt={2}>{formData.class}</Text>
      </FormControl>

      {/* Modal for details */}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        option={selectedOption}
        options={modalOptions}
        onSelect={handleModalSelect}
        details={
          selectedOption === "class"
            ? classDetails
            : selectedOption === "race"
            ? raceDetails
            : themeDetails
        }
      />
    </Box>
  );
};

export default Step2;
