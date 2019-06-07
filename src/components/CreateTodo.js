import React, { useState, useCallback } from "react";

import { keys } from "../utils/enums";

export const CreateTodo = ({ store }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChange = useCallback((e) => {
    setNewTodo(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e) => {
    // Because of safari i must compare the string
    if (e.key === keys.enter) {
      store.addTodo(newTodo);
      setNewTodo("");
    }
  });

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
