import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { getTodos } from "../services/todoService";
import type { Todo } from "../types/todo.types";

const STORAGE_KEY = "TODOS";

function parseTodos(raw: string): Todo[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed.filter(
    (item): item is Todo =>
      item !== null &&
      typeof item === "object" &&
      typeof (item as Todo).id === "number" &&
      typeof (item as Todo).title === "string" &&
      typeof (item as Todo).completed === "boolean",
  );
}

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (cancelled) return;

        if (stored) {
          setTodos(parseTodos(stored));
        } else {
          setTodos(await getTodos());
        }

        if (!cancelled) {
          hasLoadedRef.current = true;
        }
      } catch (error) {
        console.log(error);
        if (!cancelled) {
          setTodos([]);
          hasLoadedRef.current = true;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedRef.current) return;

    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch(
      (error: unknown) => {
        console.log(error);
      },
    );
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setTodos((prev: Todo[]) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
