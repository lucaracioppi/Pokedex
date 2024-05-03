import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  List,
  ListItem,
  Checkbox,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar({ text }) {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={6}>
        <Flex
          h={24}
          alignItems={"center"}
          justifyContent={"space-between"}
          position="sticky"
          top="0"
        >
          <Stack>
            <Image src="/images/pokemon.png" alt="Pokemon" width={200} />
          </Stack>
          <Stack alignItems={"center"} w={200}>
            <Text fontSize="5xl" fontFamily="unset" as="b" color="teal.500">
              Pokedex
            </Text>
          </Stack>
          <Stack width={200}>
            <Text>Aca van los filtros</Text>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
