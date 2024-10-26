import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import useLocalStorage from '../../../services/useLocalStorage';

function ToDoWidget() {
  const [userInput, setUserInput] = useState('');
  const [todoList, setTodoList] = useLocalStorage('todo-items', []);

  const addItem = (e) => {
    e.preventDefault();
    const trimmedUserInput = userInput.trim();
    if (trimmedUserInput) {
      setTodoList((existingItems) => [
        ...existingItems,
        { name: trimmedUserInput, finished: false },
      ]);
      setUserInput('');
    }
  };

  const toggleTask = (index) => {
    setTodoList((existingItems) =>
      existingItems.map((item, i) =>
        index === i ? { ...item, finished: !item.finished } : item,
      ),
    );
  };

  const deleteTask = (index) => {
    setTodoList((existingItems) => existingItems.filter((_, i) => index !== i));
  };

  return (
    <Box p={4} shadow="sm" borderWidth="1px" rounded="lg" w="100%" h="100%">
      <FormControl as="form" onSubmit={addItem}>
        <Stack spacing={4} justifyContent="center" alignItems="center" h="100%">
          <Flex direction="column" align="center">
            <FormLabel htmlFor="task-input"></FormLabel>
            <Input
              id="task-input"
              placeholder="Введите текст"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              mt={2}
            />
            <Button
              type="submit"
              colorScheme="teal"
              size="sm"
              leftIcon={<AddIcon />}
              disabled={!userInput.trim()}
              mt={2}
            >
              Добавить
            </Button>
          </Flex>
          <Stack spacing={2} justifyContent="center" alignItems="center">
            {todoList.map((item, index) => (
              <Tag
                key={index + item.name}
                size="lg"
                rounded="full"
                variant="subtle"
                colorScheme={item.finished ? 'green' : 'gray'}
              >
                <Checkbox
                  mr={2}
                  isChecked={item.finished}
                  onChange={() => toggleTask(index)}
                >
                  <TagLabel>{item.name}</TagLabel>
                </Checkbox>
                <TagCloseButton size="sm" onClick={() => deleteTask(index)} />
              </Tag>
            ))}
          </Stack>
        </Stack>
      </FormControl>
    </Box>
  );
}

export default ToDoWidget;
