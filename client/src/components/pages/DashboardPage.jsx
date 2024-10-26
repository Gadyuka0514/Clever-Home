import { useState, useEffect,} from 'react';
import {
  // IconButton,
  Heading, 
  Box,
  SimpleGrid,
  Center,
  Text,
  GridItem,
  Grid,
  ListItem,
  List,
  ListIcon,
  Divider,
  CardBody,
  Card,
  Link,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react';

import { 
  // MdSettings,
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdCheckroom,
  MdRestaurant,
  MdMeetingRoom,
  MdOutlineBedroomBaby,
  MdLiveTv,
} from 'react-icons/md';
import axiosInstance from '../../services/axiosInstance';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TimeWidget from '../widgets/TimeWidget'; 
import WeatherWidget from '../widgets/WeatherWidget'; 
import TodoWidget from '../widgets/ToDoWidget/ToDoWidget'; 

export default function DashboardPage({ user }) {
  const [messages, setDashboard] = useState([]);

  useEffect(() => {
    axiosInstance.get('/dashboard').then((response) => {
      setDashboard(response.data);
    });
  }, []);

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const formElement = event.target;
      const formData = new FormData(formElement);
      const response = await axiosInstance.post('/messages', formData);
      if (response.status === 201) {
        setDashboard((prev) => [response.data, ...prev]);
        formElement.reset();
      }
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };

    useEffect(() => {
      axiosInstance
        .get('/rooms')
        .then((res) => {
          setDashboard(res.data.room);
        })
        .catch(() => {
          setDashboard('');
        });
    }, []);

  const handleGetRooms = async (id) => {
    try {
      const response = await axiosInstance.get(`/rooms`);
      if (response.status === 204)
        setDashboard(messages.filter((room) => room.id !== id));
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };

  return (
    <Grid
      m={10}
      templateAreas={`
        "header header"
        "nav main"
      `}
      gridTemplateRows={'50px 1fr'}
      gridTemplateColumns={'250px 1fr'}
      h="800"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem borderRadius="20" pl="2" bg="gray.100" area={'nav'}>
        <Card borderRadius="10" opacity="0.7" m={10}>
          <CardBody>
            <Center>
              <Text>
                <Link
                  as={RouterLink}
                  to="/dashboard"
                  color="black"
                  textDecoration="none"
                  fontWeight="medium"
                >
                  Мой дом
                </Link>
              </Text>
            </Center>
          </CardBody>
        </Card>
        <Divider orientation="horizontal" />
        <List spacing={50} m={10} mt={10}>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room1"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdMeetingRoom} color="green.500" />
              Прихожая
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room2"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdLiveTv} color="green.500" />
              Гостиная
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room3"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdOutlineBedroomParent} color="green.500" />
              Спальня
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room4"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdOutlineBedroomBaby} color="green.500" />
              Детская
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room5"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdRestaurant} color="green.500" />
              Кухня
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room6"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdOutlineBathroom} color="green.500" />
              Ванная комната
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={RouterLink}
              to="/room7"
              color="black"
              textDecoration="none"
              fontWeight="medium"
            >
              <ListIcon as={MdCheckroom} color="green.500" />
              Гардероб
            </Link>
          </ListItem>
        </List>
      </GridItem>

      <GridItem borderRadius="25" pl="2" bg="gray.100" area={'main'}>
        <Center>
          <SimpleGrid
            p="10"
            my="100"
            spacing="10"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, minmax(350px, 1fr))"
          >
            <GridItem colSpan={1}>
              <Card align="center" borderRadius="15">
                <CardHeader>
                  <Heading size="md">Информация о погоде</Heading>
                </CardHeader>
                <CardBody p="10" align="center">
                  <TimeWidget />
                  <Divider />
                  <Box w="375px!important">
                    <WeatherWidget />
                  </Box>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </GridItem>
            <Card align="center" borderRadius="15">
              <CardHeader>
                <Heading size="md">Напоминания</Heading>
              </CardHeader>
              <CardBody>             
                  <TodoWidget />                
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
            {/* <Card align="center" borderRadius="15">
              <CardHeader>
                <Heading size="md"> Графики</Heading>
              </CardHeader>
              <CardBody>
                <Text>Картинка с графиком</Text>
              </CardBody>
              <CardFooter>
                <Button>Открыть</Button>
              </CardFooter>
            </Card> */}
          </SimpleGrid>
        </Center>
      </GridItem>
    </Grid>
  );
}
