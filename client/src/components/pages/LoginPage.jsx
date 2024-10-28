import { useState } from 'react';
import { ViewIcon, ViewOffIcon, } from '@chakra-ui/icons';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  Link,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';

export default function LoginPage({setUser}) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/login', formData);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    if (response.status === 200) {
      navigate('/dashboard');
    }
    // return alert('такой страницы нет');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <Heading as="h1" mb={6} textAlign="center">
        Вход
      </Heading>
      <Text fontSize="mb" mb={3}>
        Нет аккаунта?{' '}
        <Link color={'blue'} as={RouterLink} to="/signup">
          Зарегистрироваться
        </Link>
      </Text>
      <form onSubmit={(e) => loginHandler(e, formData)}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <Input
              type="email"
              name="email"
              placeholder="Введите ваш email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <InputGroup size="md">
              <Input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Введите ваш пароль"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  bg="transparent"
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" w="full">
            Войти
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
