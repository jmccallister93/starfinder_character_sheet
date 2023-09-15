import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import EquipmentModal from "./EquipmentModal";

const Step8 = ({ updateFormData, formData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOption, setModalOption] = useState([]);
  const [remainingCredits, setRemainingCredits] = useState(
    formData.remainingCredits || 1000
  );
  const [currentInventory, setCurrentInventory] = useState(
    formData.currentInventory || []
  );
  const [fetchedData, setFetchedData] = useState([]);

  const categories = {
    Armor: ["Basic", "Upgrades", "Shields", "Powered"],
    Items: [
      "Drugs",
      "Hybrid",
      "Magic",
      "Medicine",
      "Personal",
      "Poisons",
      "Technological",
      "Trade Goods",
    ],
    Weapons: [
      "Melee",
      "Ranged",
      "Special",
      "Solarian",
      "Accessories",
      "Ammunition",
      "Fusions",
      "Grenades",
    ],
  };

  //   Fetch data fucntion
  const fetchDataFromTable = async (tableName) => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
    } else {
      setFetchedData(data || []);
    }
  };

  // Button click when item type is clicked
  const handleButtonClick = (options) => {  
    setModalOption(options);
    let tableName = "";
    switch (options) {
      case "Basic":
        tableName = "armorBasic";
        break;
      case "Upgrades":
        tableName = "armorUpgrades";
        break;
      case "Shields":
        tableName = "armorShields";
        break;
      case "Powered":
        tableName = "armorPowered";
        break;
      case "Drugs":
        tableName = "armorUpgrades";
        break;
      case "Hybrid":
        tableName = "itemsHybrid";
        break;
      case "Magic":
        tableName = "itemsMagic";
        break;
      case "Medicine":
        tableName = "itemsMedicine";
        break;
      case "Personal":
        tableName = "itemsPersonal";
        break;
      case "Poisons":
        tableName = "itemsPoisons";
        break;
      case "Technological":
        tableName = "itemsTechnological";
        break;
      case "Trade Goods":
        tableName = "itemsTradeGood";
        break;
      case "Melee":
        tableName = "weaponsMelee";
        break;
      case "Ranged":
        tableName = "weaponsRanged";
        break;
      case "Special":
        tableName = "weaponsSpecial";
        break;
      case "Solarian":
        tableName = "weaponsSolarian";
        break;
      case "Accessories":
        tableName = "weaponsAccessories";
        break;
      case "Ammunition":
        tableName = "weaponsAmmunition";
        break;
      case "Fusions":
        tableName = "weaponsFusions";
        break;
      case "Grenades":
        tableName = "weaponsGrenades";
        break;
      default:
        console.error("Unknown category:", options);
        break;
    }
    if (tableName) {
      fetchDataFromTable(tableName);
    }
    onOpen();
  };

  //   const handleEquipmentSelect = (value => {
  //     updateFormData("equipment", value)
  //     onClose()
  //   })


    const toast = useToast();

    const handlePurchase = (item) => {
        console.log(item.Price)
        if(item.Price > remainingCredits) {
            toast({
                title: "Purchase Error",
                description: "Cannot afford the selected item.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        // Otherwise, proceed with the purchase
        setCurrentInventory(prevInventory => [...prevInventory, item]);
        setRemainingCredits(prevCredits => prevCredits - item.Price);
        // Update formData
    }

    const handleRemoveFromInventory = (itemToRemove) => {
        setCurrentInventory(prevInventory => prevInventory.filter(item => item !== itemToRemove));
        setRemainingCredits(prevCredits => prevCredits + itemToRemove.Price);
      };
      

    useEffect(() => {
      updateFormData("remainingCredits", remainingCredits)
    },[remainingCredits])

    useEffect(() => {
      updateFormData("currentInventory", currentInventory)
    },[ currentInventory])

  return (
    <Box
      color="white"
      background="rgb(50, 50, 50)"
      width="70vw"
      padding="20px"
      borderRadius="10px"
      boxShadow="0px 0px 15px rgba(0,0,0,0.2)"
    >
      <Text
        fontSize="2.5rem"
        mb="20px"
        borderBottom="2px solid white"
        paddingBottom="10px"
        textAlign="center"
        fontWeight="bold"
      >
        Step 8: Equipment
      </Text>
      <Box
        color="white"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        background="rgb(60, 60, 60)"
        padding="20px"
        borderRadius="10px"
        boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
      >
        <Box>
        <Text>
          <b>Inventory:</b>
        </Text>
        {currentInventory.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" m={2}>
            <Text flex="1">{item.Name}</Text>
            <Button  ml={2} size="sm" onClick={() => handleRemoveFromInventory(item)}>
              Remove
            </Button>
          </Box>
        ))}
        </Box>
        <Text>
          <b>Credits: </b> {remainingCredits}
        </Text>
      </Box>

      {Object.keys(categories).map((category) => (
        <Box mt={4} key={category}>
          <Text fontWeight="bold" mb={2}>
            {category}:
          </Text>
          {categories[category].map((item) => (
            <Button
              key={item}
              onClick={() => handleButtonClick(item)}
              mr={2}
              mb={2}
            >
              {item}
            </Button>
          ))}
        </Box>
      ))}

      {/* Modal */}
      <EquipmentModal
        isOpen={isOpen}
        onClose={onClose}
        fetchedData={fetchedData}
        option={modalOption}
        handlePurchase={handlePurchase}
        remainingCredits={remainingCredits}
        // options={fetchedData}
        // details={fetchedData}
        // onSelect={setSelectedItem}
      />
    </Box>
  );
};

export default Step8;
