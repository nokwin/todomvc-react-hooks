import React, { useState, useRef } from "react";
import cn from "classnames";

import { todoActions } from "../reducers/todo";
import { keys } from "../utils/keys";

export const Todo = ({ item, dispatch }) => {
  const [editValue, setEditValue] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);
  const editElement = useRef(null);
  const classes = cn({ completed: item.done, editing: isEditing });

  function handleOnChange() {
    dispatch({ type: todoActions.toggleDone, payload: item.id });
  }

  function handleOnClick() {
    dispatch({ type: todoActions.delete, payload: item.id });
  }

  function handleEditOnChange(e) {
    setEditValue(e.target.value);
  }

  function handleOnDoubleClick() {
    setIsEditing(true);

    setTimeout(() => {
      editElement.current.focus();
    });
  }

  function finishEditing() {
    setIsEditing(false);
    dispatch({
      type: todoActions.edit,
      payload: { id: item.id, name: editValue }
    });
  }

  function handleOnKeyPress(e) {
    if (e.key === keys.enter) {
      finishEditing();
    }
  }

  return (
    <li className={classes}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={item.done}
          value={item.done}
          onChange={handleOnChange}
        />
        <label onDoubleClick={handleOnDoubleClick}>{item.name}</label>
        <button className="destroy" onClick={handleOnClick} />
      </div>
      <input
        className="edit"
        value={editValue}
        onChange={handleEditOnChange}
        onBlur={finishEditing}
        ref={editElement}
        onKeyPress={handleOnKeyPress}
      />
    </li>
  );
};
