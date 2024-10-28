import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import {
  Box,
  VStack,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Center,
  Text,
  GridItem,
  Grid,
  ListItem,
  List,
  ListIcon,
  Divider,
  Link,
  Button,
  Flex,
  Avatar,
  FormControl,
  FormLabel,
  Select,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export default function ProfilePage({ user }) {
  const [profile, setProfile] = useState([]);

const [showPass, setShowPass] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
      axiosInstance.get('/profile').then((response) => {
        setProfile(response.data[0]);       
      });
  }, []);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    role: user.role
  });

  const updHandler = async (e, formData) => {
      e.preventDefault();
      const response = await axiosInstance.patch('/profile/:profileId', formData);
      setProfile(response.data.user);
      setAccessToken(response.data.accessToken);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box bg="grey.100" align="center">
      <Stack direction="row" justify="center" py={10} mt={10} spacing={10}>
        <Avatar size="xl" bgColor="grey" color="black" profile={profile.name} src="" />{' '}
        <Center height="100" bgColor="black">
          <Divider orientation="vertical" />
        </Center>
        <Heading as="h1" size="2xl" py={5}>
          {profile.name}
        </Heading>
      </Stack>
      <Flex bg="grey.100" color="black" py={10} mt={10} justify="center" align="center">
        <Stack direction="row">
          <SimpleGrid columns={2} spacing={150} role="group">
            <form onSubmit={(e) => updHandler(e, formData)}>
              <List>
                <ListItem>
                  <FormControl isRequired>
                    <Input
                      m={4}
                      w="100%"
                      type="name"
                      name="name"
                      placeholder="Введите ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <Input
                      m={4}
                      w="100%"
                      type="email"
                      name="email"
                      placeholder="Введите ваш email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Stack w="100%">
                      <InputGroup size="md" m={4}>
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
                    </Stack>
                    <Select m={4} w="100%">
                      <option>Администратор</option>
                      <option>Пользователь</option>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </form>

            {/* <Divider orientation="vertical" /> */}

            <List>
              <ListItem>
                <Button
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="5px"
                  w="100%"
                  p={2}
                  m={2}
                  color="black"
                  variant="outline"
                  onClick={() => navigate('/houses')}
                >
                  Список домов
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="5px"
                  w="100%"
                  p={2}
                  m={2}
                  color="black"
                  variant="outline"
                  onClick={() => navigate('/rooms')}
                >
                  Список помещений
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="5px"
                  w="100%"
                  p={2}
                  m={2}
                  color="black"
                  variant="outline"
                  onClick={() => navigate('/devices')}
                >
                  Список устройств
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="5px"
                  w="100%"
                  p={2}
                  m={2}
                  color="black"
                  variant="outline"
                  onClick={() => navigate('/rooles')}
                >
                  Список сценариев
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="5px"
                  w="100%"
                  p={2}
                  m={2}
                  color="black"
                  variant="outline"
                  onClick={() => navigate('/logs')}
                >
                  Список событий
                </Button>
              </ListItem>
            </List>
          </SimpleGrid>
        </Stack>
      </Flex>

      {/* Футер */}
      <Box p={0} mr={13} align="right">
        <VStack spacing={4}>
          <Button type="submit" colorScheme="teal" variant="solid">
            Сохранить
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
