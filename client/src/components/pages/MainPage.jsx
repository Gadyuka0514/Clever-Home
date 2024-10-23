import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Flex,
  Button,
  Link,
} from '@chakra-ui/react';
import Feature from '../ui/Feature';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function MainPage() {
  return (
    <Box bg="teal.600">
      <Flex bg="teal.600"></Flex>
      {/* Приветствие */}
      <Flex bg="teal.600" color="white" py={20} mt={165} justify="center" align="center">
        <VStack spacing={4} textAlign="center">
          <Heading as="h1" size="2xl">
            Добро пожаловать в Clever-Home!
          </Heading>
          <Text fontSize="lg" maxW="600px">
            Ваш незаменный помощник в управлении умными устройствами! C легкостью поможет
            автоматизировать привычные домашние дела. Создавайте и меняйте сценарии,
            взаимодействуйте с устройствами. Следите за состоянием вашего дома из любой
            точки мира! Авторизируйтесь, чтобы начать .
          </Text>
          <SimpleGrid columns={2} spacing={10}>
            <Button
              as={RouterLink}
              to="/login"             
              colorScheme="teal"
              variant="solid"
            >
              Войти
            </Button>
            <Button
              as={RouterLink}
              to="/signup"
              colorScheme="teal"
              variant="solid"
            >
              Зарегистрироваться
            </Button>
          </SimpleGrid>
        </VStack>
      </Flex>

      {/* Футер */}
      <Box bg="gray.700" color="white" py={7} mt={160}>
        <VStack spacing={4}>
          <Heading as="h3" size="md">
            Свяжитесь с нами
          </Heading>         
          <Text>&copy; Clever-Home. Все права защищены.</Text>
        </VStack>
      </Box>
    </Box>
  );
}
