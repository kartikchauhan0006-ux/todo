import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import { Draggable } from "react-beautiful-dnd";
import todoIcon from "../assets/check-circle.svg";

const Todo = ({ todo, delTodo, toggleTodoDone, editTodo, starTodo, index }) => {
  const [editInputValue, setInputValue] = useState(todo.title);
  const [isEdit, setIsEdit] = useState(false);
  const inputEle = useRef(null);

  useEffect(() => {
    if (isEdit && inputEle.current) {
      inputEle.current.focus();
    }
  }, [isEdit]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeydown = (e) => {
    let keyCode = e.which || e.keyCode;
    const value = editInputValue.trim();

    if (keyCode === 13 && value.length) {
      e.preventDefault();
      editTodo({ ...todo, title: value });
      setIsEdit(false);
    }
    if (keyCode === 27) {
      cancelEdit();
    }
  };

  const cancelEdit = (e) => {
    if (e?.relatedTarget && e.relatedTarget.closest(".task-item-action"))
      return;

    setInputValue(todo.title);
    setIsEdit(false);
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx("task-item", {
            done: todo.isDone,
            edit: isEdit,
            star: todo.isStar,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            background: snapshot.isDragging ? "#091E3511" : "inherit",
          }}
        >
          <div
            className="task-item-checked"
            onClick={() => toggleTodoDone(todo.id)}
          >
            <span className="icon icon-checked">
              <img src={todoIcon} alt="Todo Icon" />{" "}
            </span>
          </div>

          <div className="task-item-body" onDoubleClick={() => setIsEdit(true)}>
            <span className="task-item-body-text" title="Double-click to edit">
              {todo.title}
            </span>

            <input
              className="task-item-body-input"
              type="text"
              value={editInputValue}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              onBlur={cancelEdit}
              ref={inputEle}
            />
          </div>
          <div className="task-item-action">
            {isEdit ? (
              <button
                className="btn-reset btn-save icon"
                onClick={() => {
                  const value = editInputValue.trim();
                  if (value.length) {
                    editTodo({ ...todo, title: value });
                    setIsEdit(false);
                  }
                }}
                title="Save"
              >
                ✅
              </button>
            ) : (
              <button
                className="btn-reset btn-edit icon"
                onClick={() => setIsEdit(true)}
                title="Edit"
              >
                ✏️
              </button>
            )}

            <button
              className="btn-reset btn-destroy icon"
              onClick={() => delTodo(todo.id)}
              title="Delete"
            >
              ✖️
            </button>

            <button
              className="btn-reset btn-star icon"
              onClick={() => starTodo(todo.id)}
              title="Star"
            ></button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Todo);
