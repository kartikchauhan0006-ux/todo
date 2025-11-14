import React from "react";
import clsx from "clsx";

const Footer = ({ remainingTodos, finishedTodos, clearTodos }) => (
  <footer>
    <p>
      <span>{remainingTodos}</span> JOB
      {remainingTodos > 1 ? "S" : ""} LEFT TO DO
    </p>

    <button
      className={clsx("btn btn-reset", { "btn-disable": !finishedTodos })}
      onClick={clearTodos}
    >
      🗑 CLEAR FINISHED
    </button>
  </footer>
);

export default Footer;
