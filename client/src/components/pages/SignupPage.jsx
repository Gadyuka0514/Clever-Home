import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Link,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';


export default function SignupPage({ setUser }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const signupHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post('/auth/signup', formData);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    if (response.status === 200) {
      navigate('/dashboard');
    }
    // return alert('такой страницы нет');
  };

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <Heading as="h1" mb={6} textAlign="center">
        Регистрация
      </Heading>
      <Text fontSize="mb" mb={3}>
        Есть аккаунт?{' '}
        <Link color={'blue'} as={RouterLink} to="/login">
          Авторизироваться
        </Link>
      </Text>
      <form onSubmit={(e) => signupHandler(e, formData)}>
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
            <Input
              type="text"
              name="name"
              placeholder="Введите имя пользователя"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <InputGroup size="md">
              <Input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Введите пароль"
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

          <FormControl isRequired>
            <InputGroup size="md">
              <Input
                type={showPass ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                isInvalid={
                  formData.password !== formData.confirmPassword &&
                  formData.confirmPassword.length > 0
                }
                errorBorderColor="crimson"
                value={formData.confirmPassword}
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
            Зарегистрироваться
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
