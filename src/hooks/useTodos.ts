import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getTodos } from "../services/todoService";
import { Todo } from "../types/todo.types";

const STORAGE_KEY = "TODOS";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadInitialTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadInitialTodos = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const localTodos: Todo[] = JSON.parse(stored);
        setTodos(localTodos);
      } else {
        const apiTodos = await getTodos();
        setTodos(apiTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
