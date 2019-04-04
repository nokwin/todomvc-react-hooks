import React, { Fragment, useState } from "react";

import { todoActions } from "../reducers/todo";

export const MarkAllCompleted = ({ dispatch }) => {
  const [allCompleted, setAllCompleted] = useState(false);

  function handleCheckbox(e) {
    dispatch({ type: todoActions.toggleDoneAll, payload: e.target.checked });
    setAllCompleted(e.target.checked);
  }

  return (
    <Fragment>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        value={allCompleted}
        onChange={handleCheckbox}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </Fragment>
  );
};
