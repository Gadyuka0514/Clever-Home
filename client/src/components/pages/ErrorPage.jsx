import { Box, VStack, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Image src="../../../../public/EVA.png" alt="Robot" maxW="500px" mx="auto" mb={6} />
      <Heading as="h1" size="2xl" mb={4}>
        Ой! Что-то пошло не так
      </Heading>
      <Text fontSize="2xl" mb={6}>
        Но скоро здесь будет что-то особенное...
      </Text>
      <VStack spacing={4}>
        <Button as={Link} to="/dashboard" colorScheme="teal" size="lg">
          На главную
        </Button>
        <Text color="gray.500">
          Попробуйте вернуться на главную страницу и начать заново.
        </Text>
      </VStack>
    </Box>
  );
}
