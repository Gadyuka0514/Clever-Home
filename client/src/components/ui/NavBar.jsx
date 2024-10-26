import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MdReceipt, MdExitToApp, MdSettings } from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {
  const navigate = useNavigate();
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold" fontSize="xl">
            <Link as={RouterLink} to="/dashboard" color="white" fontWeight="medium">
              Clever-Home
            </Link>
          </Box>
        </HStack>

        <HStack spacing={4}>
          {user ? (
            <>
              <Menu boxShadow="xl" bg="gray.500">
                <MenuButton>
                  <Wrap>
                    <WrapItem>
                      <Avatar
                        bgColor="white"
                        color="black"
                        colorScheme="teal"
                        name={user.name}
                        src=""
                      />
                    </WrapItem>
                  </Wrap>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate('/profile')}>
                    <HStack>
                      <Avatar bgColor="grey" color="black" name={user.name} src="" />{' '}
                      <Text>{user.name}</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem icon={<MdReceipt />} onClick={() => navigate('/logs')}>
                    Список событий
                  </MenuItem>
                  <MenuItem icon={<MdSettings />} onClick={() => navigate('/settings')}>
                    Настройки
                  </MenuItem>
                  <MenuItem
                    icon={<MdExitToApp />}
                    color="red.500"
                    onClick={() => logoutHandler().then(() => navigate('/login'))}
                  >
                    Выйти
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
