import React, { useState } from "react";

const keys = {
  enter: "Enter"
};

export const CreateTodo = ({ onSubmit }) => {
  const [newTodo, setNewTodo] = useState("");

  function handleChange(e) {
    setNewTodo(e.target.value);
  }

  function handleKeyPress(e) {
    // Because of safari i must compare the string
    if (e.key === keys.enter) {
      onSubmit(e.target.value);
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
