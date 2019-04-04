import React from "react";
import cn from "classnames";

export const FilterItem = ({ filter, children, setFilter, currentFilter }) => {
  const filterClasses = cn({ selected: currentFilter === filter });

  function handleOnClick() {
    setFilter(filter);
  }

  return (
    <li>
      <a className={filterClasses} onClick={handleOnClick} href="#/">
        {children}
      </a>
    </li>
  );
};
