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

export default function PokemonData({ pokemon, typeColors }) {
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
          types: pokemon.types,
          weight: pokemon.weight,
          height: pokemon.height,
          moves: pokemon.moves,
          stats: pokemon.stats,
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
        <Box position="absolute" left="0" mt={"2"} zIndex="99">
          <Checkbox
            isChecked={catched}
            onChange={handleCheckboxChange}
            colorScheme={"green"}
            size={"lg"}
          >
            Catched
          </Checkbox>
        </Box>

        <AspectRatio w="full" ratio={1} mt={"5"} mb={"2"}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" justifyContent="center" mt={"-8"}>
          <Text
            textTransform={"capitalize"}
            fontWeight="semibold"
            fontSize={"3xl"}
            textAlign="center"
            as={"b"}
            borderRight={"1px"}
            borderColor={"gray.300"}
            pr={"2"}
          >
            #{pokemon.id}
          </Text>
          <Text
            textTransform={"capitalize"}
            fontWeight="semibold"
            fontSize={"3xl"}
            textAlign="center"
            as={"b"}
          >
            {pokemon.name}
          </Text>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Stack direction="row" bg="gray.100" p="3" borderRadius="md">
            <Stack
              pr="2"
              alignItems="center"
              borderRightWidth="1px"
              borderRightColor="gray.300"
            >
              <Text fontSize="sm" fontWeight="semibold">
                Weight
              </Text>
              <Text>{pokemon.weight}</Text>
            </Stack>
            <Stack
              pr="2"
              alignItems="center"
              borderRightWidth="1px"
              borderRightColor="gray.300"
            >
              <Text fontSize="sm" fontWeight="semibold">
                Height
              </Text>
              <Text>{pokemon.height}</Text>
            </Stack>
            <Stack alignItems="center">
              <Text fontSize="sm" fontWeight="semibold">
                Movements
              </Text>
              <Text>{pokemon.moves.length}</Text>
            </Stack>
          </Stack>
          <Stack bg="gray.100" p="3" borderRadius="md" alignItems={"center"}>
            <Text fontSize="sm" fontWeight="semibold">
              Types
            </Text>
            <HStack>
              {pokemon.types.map((type, index) => (
                <Badge key={index} colorScheme={typeColors[type.type.name]}>
                  {type.type.name}
                </Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="3" p="5" bg="gray.100" borderRadius="xl">
        <Text fontSize="md" fontWeight="bold">
          Stats
        </Text>
        <Stack>
          <Text fontSize="xs">HP</Text>
          <Progress
            bg="gray.300"
            borderRadius="full"
            colorScheme={"green"}
            value={pokemon.stats[0].base_stat}
          />
        </Stack>
        <Stack>
          <Text fontSize="xs">Attack</Text>
          <Progress
            bg="gray.300"
            borderRadius="full"
            colorScheme={"red"}
            value={pokemon.stats[1].base_stat}
          />
        </Stack>
        <Stack>
          <Text fontSize="xs">Defense</Text>
          <Progress
            bg="gray.300"
            borderRadius="full"
            colorScheme={"blue"}
            value={pokemon.stats[2].base_stat}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
