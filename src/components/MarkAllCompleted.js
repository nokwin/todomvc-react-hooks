import React, { Fragment, useState } from "react";

export const MarkAllCompleted = ({ store }) => {
  const [allCompleted, setAllCompleted] = useState(false);

  function handleCheckbox(e) {
    store.toggleDoneAll(e.target.checked);
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
