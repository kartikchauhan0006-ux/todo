import React from "react";

import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";

const Todos = ({ todos, delTodo, toggleTodoDone, editTodo, starTodo }) => {
  return (
    <>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <div
            className="todos"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos
              .map((todo, index) => (
                <Todo
                  className="draggable-item"
                  todo={todo}
                  delTodo={delTodo}
                  editTodo={editTodo}
                  starTodo={starTodo}
                  toggleTodoDone={toggleTodoDone}
                  key={todo.id}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Todos;
