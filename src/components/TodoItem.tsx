import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../types/todo.types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <View className="w-full flex-row items-start rounded-xl bg-slate-900 px-4 py-3">
      <TouchableOpacity
        onPress={() => onToggle(todo.id)}
        className="flex-1 pr-3"
        activeOpacity={0.7}
      >
        <Text
          className={[
            "text-base text-slate-100 flex-shrink",
            todo.completed ? "text-slate-500 line-through" : "",
          ].join(" ")}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDelete(todo.id)}
        className="ml-auto"
        hitSlop={10}
        activeOpacity={0.7}
      >
        <Text className="px-2 py-1 text-base font-bold text-red-500">X</Text>
      </TouchableOpacity>
    </View>
  );
}
