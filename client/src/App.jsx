import { createBrowserRouter, redirect, RouterProvider, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import DashboardPage from './components/pages/DashboardPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import OneMessagePage from './components/pages/OneMessagePage';
import ErrorPage from './components/pages/ErrorPage';
import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from './services/axiosInstance';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import ProfilePage from './components/pages/ProfilePage';
import { Center, Spinner, Box, Text, HStack } from '@chakra-ui/react';

function App() {
 
  const [user, setUser] = useState();
  
  const [rooms, setDashboard] = useState([]);
 
  useEffect(() => {
    axiosInstance
      .get('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);


  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  const listName = useEffect(() => {
    axiosInstance
      .get('/rooms')
      .then((res) => {
        const roomName = res.data.map((el) => el.roomName);
        setDashboard(roomName);
      })
      .catch(() => {
        setDashboard('');
      });
  }, []); 

  const router = createBrowserRouter([
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/dashboard',
          element: <DashboardPage user={user} listName={listName} />,
        },
        {
          path: '/rooms/:roomId',
          element: <OneMessagePage user={user} />,
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute redirectPath="/login" isAllowed={!!user}>
              <ProfilePage user={user} />
            </ProtectedRoute>
          ),
        },
        {
          element: <ProtectedRoute isAllowed={user === null} />,
          children: [
            {
              path: '/login',
              element: <LoginPage setUser={setUser} />,
            },
            {
              path: '/signup',
              element: <SignupPage setUser={setUser} />,
            },
          ],
        },
      ],
    },
  ]);

  if (user === undefined) return (
    <Box position="relative" height="100%">
      <Center p="4" color="white" axis="both">
        <HStack>
          <Text color="black">Loading</Text>
          <Spinner size="xl" color="blue.500" />
        </HStack>
      </Center>
    </Box>
  );

  return <RouterProvider router={router} />;
}

export default App;
