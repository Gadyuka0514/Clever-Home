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
import AccountPage from './components/pages/AccountPage';



function App() {
 
  const [user, setUser] = useState();

 

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
          element: <DashboardPage user={user} />,
        },
        {
          path: '/messages/:messageId',
          element: <OneMessagePage user={user} />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRoute redirectPath="/login" isAllowed={!!user}>
              <AccountPage user={user} />
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

  if (user === undefined) return <h1>Loading...</h1>;

  return <RouterProvider router={router} />;
}

export default App;
