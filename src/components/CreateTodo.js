import React, { useState } from "react";

import { keys } from "../utils/enums";

export const CreateTodo = ({ store }) => {
  const [newTodo, setNewTodo] = useState("");

  function handleChange(e) {
    setNewTodo(e.target.value);
  }

  function handleKeyPress(e) {
    // Because of safari i must compare the string
    if (e.key === keys.enter) {
      store.addTodo(newTodo);
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
