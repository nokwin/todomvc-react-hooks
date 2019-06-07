import React, { useCallback, useMemo } from "react";
import cn from "classnames";

export const FilterItem = ({ filter, children, setFilter, currentFilter }) => {
  const handleOnClick = useCallback(() => {
    setFilter(filter);
  }, []);

  const filterClasses = useMemo(() => {
    cn({ selected: currentFilter === filter })
  }, [currentFilter]);

  return (
    <li>
      <a className={filterClasses} onClick={handleOnClick} href="#/">
        {children}
      </a>
    </li>
  );
};
