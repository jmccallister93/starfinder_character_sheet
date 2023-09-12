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

  // Select function for Modal
  const handleModalSelect = (value) => {
    console.log("Selected Option:", selectedOption);
    console.log("Value:", value);
    setFormData(selectedOption, value);
    onClose();
};


  // Fetch data function
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

  // Empty data arrays
  const [data, setData] = useState({
    classes: [],
    races: [],
    themes: [],
  });

  const [classDetails, setClassDetails] = useState({});
  const [raceDetails, setRaceDetails] = useState({});
  const [themeDetails, setThemeDetails] = useState({});

  // Fetch Data
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
        {formData.race ? (
          <>
            <Text mt={2}>
              <strong>Name:</strong> {formData.race?.Name}
            </Text>
            <Text mt={2}>
              <strong>Ability:</strong> {formData.race?.Ability}
            </Text>
            <Text mt={2}>
              <strong>HP:</strong> {formData.race?.HP}
            </Text>
            <Text mt={2}>
              <strong>Size:</strong> {formData.race?.Size}
            </Text>
            <Text mt={2}>
              <strong>Type:</strong> {formData.race?.Type}
            </Text>
            <Text mt={2}>
              <strong>Description:</strong> {formData.race?.Description}
            </Text>
          </>
        ) : null}
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
        {formData.theme ? (
          <>
            <Text mt={2}>
              <strong>Name:</strong> {formData.theme?.Name}
            </Text>
            <Text mt={2}>
              <strong>Ability:</strong> {formData.theme?.Ability}
            </Text>
            <Text mt={2}>
              <strong>Class Skill:</strong> {formData.theme?.ClassSkill}
            </Text>
            <Text mt={2}>
              <strong>Description:</strong> {formData.theme?.Description}
            </Text>
          </>
        ) : null}
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
        {formData.class ? (
          <>
            <Text mt={2}>
              <strong>Name:</strong> {formData.class?.Name}
            </Text>
            <Text mt={2}>
              <strong>Stamina Points:</strong> {formData.class?.StaminaPoints}
            </Text>
            <Text mt={2}>
              <strong>HP:</strong> {formData.class?.HP}
            </Text>
            <Text mt={2}>
              <strong>Description:</strong> {formData.class?.Description}
            </Text>
            <Text mt={2}>
              <strong>Key Ability Description:</strong>{" "}
              {formData.class?.KeyAbilityDescription}
            </Text>
            <Text mt={2}>
              <strong>Key Ability:</strong> {formData.class?.KeyAbility}
            </Text>
          </>
        ) : null}
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
