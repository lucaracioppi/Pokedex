import {
  Box,
  AspectRatio,
  Image,
  Stack,
  SimpleGrid,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  Badge,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonData({ pokemon }) {
  const [catched, setCatched] = useState(false);

  useEffect(() => {
    // Consulta a la API si el Pokemon esta capturado
    const fetchCatchedStatus = async () => {
      try {
        const response = await axios.get(`/api/catched`);
        setCatched(response.data.some((p) => p.id === pokemon.id));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCatchedStatus();
  }, [pokemon.id]);

  const handleCheckboxChange = async (event) => {
    const isChecked = event.target.checked;
    setCatched(isChecked);
    try {
      if (isChecked) {
        // Captura el Pokémon
        await axios.post("/api/catched", {
          id: pokemon.id,
          name: pokemon.name,
        });
      } else {
        // Libera el Pokémon
        await axios.delete(`/api/catched/${pokemon.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox isChecked={catched} onChange={handleCheckboxChange}>
            Catched
          </Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" justifyContent="space-around">
          <Stack direction="row" bg="gray.100" p="3" borderRadius="md">
            <Stack
              pr="2"
              alignItems="center"
              borderRightWidth="1px"
              borderRightColor="gray.300"
            >
              <Text fontSize="sm" fontWeight="bold">
                Weight
              </Text>
              <Text>20</Text>
            </Stack>
            <Stack
              pr="2"
              alignItems="center"
              borderRightWidth="1px"
              borderRightColor="gray.300"
            >
              <Text fontSize="sm" fontWeight="bold">
                Height
              </Text>
              <Text>12</Text>
            </Stack>
            <Stack alignItems="center">
              <Text fontSize="sm" fontWeight="bold">
                Movimientos
              </Text>
              <Text>109</Text>
            </Stack>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
            <HStack>
              <Badge>Agua</Badge>
              <Badge>Agua</Badge>
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Text fontSize="xs">hp</Text>
          <Progress bg="gray.300" borderRadius="full" value={80} />
        </Stack>
        <Stack>
          <Text fontSize="xs">attack</Text>
          <Progress bg="gray.300" borderRadius="full" value={65} />
        </Stack>
      </Stack>
    </Stack>
  );
}
