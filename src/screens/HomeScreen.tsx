import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import TodoItem from "../components/TodoItem";
import useTodos from "../hooks/useTodos";
import { Todo } from "../types/todo.types";

export default function HomeScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [text, setText] = useState<string>("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <View className="flex-1 bg-slate-950 px-8 pt-12">
      <View className="mb-4 flex-row items-center gap-3">
        <TextInput
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100"
          placeholder="Nueva tarea..."
          placeholderTextColor="#94A3B8"
          value={text}
          onChangeText={setText}
        />
        <Pressable
          onPress={handleAdd}
          className="rounded-xl bg-blue-500 px-4 py-2.5"
        >
          <Text className="font-semibold text-white">Agregar</Text>
        </Pressable>
      </View>

      <FlatList<Todo>
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-3"
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      />
    </View>
  );
}
