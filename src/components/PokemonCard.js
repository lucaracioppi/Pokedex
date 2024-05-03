import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
} from "@chakra-ui/react";

export default function PokemonCard({ pokemon, typeColors }) {
  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      w="full"
      borderRadius="xl"
      alignItems="center"
    >
      <AspectRatio p="5" w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
        />
      </AspectRatio>
      <Stack
        px="5"
        pt="1"
        pb="3"
        w="full"
        borderTop="1px"
        borderColor="gray.200"
        spacing="5"
      >
        <Stack direction="row" justifyContent={"center"}>
          <Text
            fontWeight="bold"
            borderRight={"1px"}
            borderColor={"gray.300"}
            pr={"2"}
          >
            #{pokemon.id}
          </Text>
          <Text
            textAlign="center"
            textTransform="Capitalize"
            fontWeight="semibold"
          >
            {pokemon.name}
          </Text>
        </Stack>
        <HStack>
          {pokemon.types.map((type) => (
            <Badge
              size="xs"
              key={type.slot}
              colorScheme={typeColors[type.type.name]}
            >
              {type.type.name}
            </Badge>
          ))}
        </HStack>
      </Stack>
    </Stack>
  );
}
