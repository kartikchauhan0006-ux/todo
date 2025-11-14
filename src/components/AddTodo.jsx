import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import addIcon from "../assets/add-Icon.svg";

const AddTodo = ({ inputValue, handleInputChange, addTodo }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className={clsx("add-todo", { active: inputValue })}
      onSubmit={addTodo}
    >
      <div className="input-group">
        <div className="add-todo-icon">
          <label className="add-todo-icon icon" htmlFor="add-todo-input">
            <img src={addIcon} alt="add Icon" />
          </label>
        </div>

        <div className="add-todo-input">
          <input
            id="add-todo-input"
            ref={inputRef}
            type="text"
            placeholder="Adding more todos"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="add-todo-action">
        <button
          className={`btn-reset btn-add ${
            !inputValue.trim() ? "disabled" : ""
          }`}
          type="submit"
          disabled={!inputValue.trim()}
        >
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
