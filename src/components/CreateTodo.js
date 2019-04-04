import React, { useState } from "react";

import { todoActions } from "../reducers/todo";
import { keys } from "../utils/keys";

export const CreateTodo = ({ dispatch }) => {
  const [newTodo, setNewTodo] = useState("");

  function handleChange(e) {
    setNewTodo(e.target.value);
  }

  function handleKeyPress(e) {
    // Because of safari i must compare the string
    if (e.key === keys.enter) {
      dispatch({ type: todoActions.create, payload: e.target.value });
      setNewTodo("");
    }
  }

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onChange={handleChange}
      value={newTodo}
      onKeyPress={handleKeyPress}
    />
  );
};
