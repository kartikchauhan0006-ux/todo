import React from "react";

const Header = ({ sortTodosByStar }) => (
  <header>
    <h2>Todo List</h2>
    <button className="btn btn-reset" onClick={sortTodosByStar}>
      <span role="img" aria-label="sort">
        🔁
      </span>{" "}
      SORT BY STARS
    </button>
  </header>
);

export default Header;
