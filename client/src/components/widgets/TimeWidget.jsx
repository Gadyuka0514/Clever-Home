import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Drawer,
  DrawerContent,
  useDisclosure,
  VStack,
  HStack,
  Square,
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
const { OPEN_WEATHER_API_KEY } = import.meta.env;


const TimeWidget = () => {
  const timeElementRef = useRef(null); // ссылка на элемент span

  useEffect(() => {
    if (!window.time_is_widget) {
      const script = document.createElement('script');
      script.src = '//widget.time.is/ru.js'; // загружаем русский скрипт виджета
      script.async = true;
      script.onload = () => {
        window.time_is_widget.init({
          Moscow_z71d: {
            template: 'DATE<br>TIME',
            date_format: 'dnum.monthnum.year',
          },
        });
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <a
        href="https://time.is/Moscow"
        id="time_is_link"
        rel="nofollow"
        style={{ fontSize: '36px' }}
      >
      </a>
      <span id="Moscow_z71d" ref={timeElementRef} style={{ fontSize: '36px' }} />
    </>
  );
};

export default TimeWidget;