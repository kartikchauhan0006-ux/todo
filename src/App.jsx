import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

import { useTodos } from "./hooks/useTodos";
import { useInput } from "./hooks/useInput";
import "./styles.scss";
import About from "./components/About";

function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleDone,
    toggleStar,
    clearFinished,
    sortByStar,
    onDragEnd,
  } = useTodos();

  const {
    value: inputValue,
    onChange: handleInputChange,
    reset: resetInput,
  } = useInput("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    resetInput();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="appContainer">
        <Header sortTodosByStar={sortByStar} />

        <About />

        <AddTodo
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          addTodo={handleAddTodo}
        />

        <Todos
          todos={todos}
          delTodo={deleteTodo}
          editTodo={editTodo}
          starTodo={toggleStar}
          toggleTodoDone={toggleDone}
        />

        <Footer
          remainingTodos={todos.filter((item) => !item.isDone).length}
          finishedTodos={todos.filter((item) => item.isDone).length}
          clearTodos={clearFinished}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
