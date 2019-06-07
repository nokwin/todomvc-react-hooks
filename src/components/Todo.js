import React, { useState, useRef, useCallback } from "react";
import cn from "classnames";

import { keys } from "../utils/enums";

export const Todo = ({ item, store }) => {
  const [editValue, setEditValue] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);
  const editElement = useRef(null);
  const classes = cn({ completed: item.done, editing: isEditing });

  const handleOnChange = useCallback(e => {
    store.toggleDone(item.id);
  }, []);

  const handleOnClick = useCallback(() => {
    store.delete(item.id);
  }, []);

  const handleEditOnChange = useCallback(e => {
    setEditValue(e.target.value);
  }, []);

  const handleOnDoubleClick = useCallback(() => {
    setIsEditing(true);

    setTimeout(() => {
      editElement.current.focus();
    });
  }, [])

  const finishEditing = useCallback(() => {
    setIsEditing(false);
    store.edit(item.id, editValue);
  }, [editValue]);

  const handleOnKeyPress = useCallback((e) => {
    if (e.key === keys.enter) {
      finishEditing();
    }
  }, []);

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
