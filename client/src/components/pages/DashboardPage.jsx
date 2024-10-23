import { useState, useEffect,} from 'react';

import {
  IconButton,
  Heading,
  Button,
  Box,
  SimpleGrid,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  VStack,
  Square,
  Center,
  HStack,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import MessageCard from '../ui/MessageCard';
import AddMessageForm from '../ui/AddMessageForm';
import axiosInstance from '../../services/axiosInstance';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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

  const handleDeletePost = async (id) => {
    try {
      const response = await axiosInstance.delete(`/messages/${id}`);
      if (response.status === 204)
        setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.log(error);
      alert(`Что-то пошло не так: ${error?.response?.data?.text}`);
    }
  };
  return (
    <Box bg="teal.600">
      <Flex></Flex>
      {/* Приветствие */}
      <Flex color="white" py={20} mt={165} justify="center" align="center">
        <VStack spacing={4} textAlign="center">
          <Box flex="1">       
            <SimpleGrid minChildWidth="120px" spacing="30px">
              <Box bg="tomato" height="80px">
                <Text>Дата и время/Погода</Text>
              </Box>
              <Box bg="tomato" height="80px">
                <Text>Список дел </Text>
              </Box>
              <Box bg="tomato" height="80px">
                <Text>График</Text>
              </Box>
              <Box bg="tomato" height="80px">
                <Text>Плеер</Text>
              </Box>
            </SimpleGrid>
          </Box> 
        </VStack>
      </Flex>
    </Box>
  );
}
