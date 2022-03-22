import { Avatar, Box, Flex, Text, Badge } from "@chakra-ui/react";


interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex>
      {showProfileData && (
        <Box ml="3">
          <Text fontWeight="bold">
            Maycon Ferreira
            <Badge mx="2" colorScheme="green">
              Owner
            </Badge>
          </Text>
          <Text fontSize="xs">Backend Developer</Text>
        </Box>
      )}
      <Avatar
        name="Maycon Ferreira"
        src="https://github.com/mayconMello.png"
      />
    </Flex>
  )
}