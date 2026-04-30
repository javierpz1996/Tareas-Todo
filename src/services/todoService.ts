import { Todo } from "../types/todo.types";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(BASE_URL);
  const data: Todo[] = await response.json();

  return data.slice(0, 10);
};

