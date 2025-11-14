import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import arrayMove from "array-move";
import { saveLocal, loadLocal } from "../utils";
import { initTasks } from "../constants";

export const useTodos = () => {
  const [todos, setTodos] = useState(() => loadLocal() || initTasks);

  useEffect(() => {
    saveLocal(todos);
  }, [todos]);

  const addTodo = useCallback((title) => {
    if (!title.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: uuidv4(), title: title.trim(), isDone: false, isStar: false },
    ]);
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback((updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }, []);

  const toggleDone = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }, []);

  const toggleStar = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isStar: !todo.isStar } : todo
      )
    );
  }, []);

  const clearFinished = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.isDone));
  }, []);

  const sortByStar = useCallback(() => {
    setTodos((prev) => [...prev].sort((a, b) => (a.isStar ? -1 : 1)));
  }, []);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    setTodos((prev) =>
      arrayMove(prev, result.source.index, result.destination.index)
    );
  }, []);

  return {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleDone,
    toggleStar,
    clearFinished,
    sortByStar,
    onDragEnd,
  };
};
