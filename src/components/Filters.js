import React from "react";

import { FilterItem } from "./FilterItem";
import { filters } from "../utils/enums";

export const Filters = ({ setFilter, filter }) => (
  <ul className="filters">
    <FilterItem
      filter={filters.all}
      setFilter={setFilter}
      currentFilter={filter}
    >
      All
    </FilterItem>
    <FilterItem
      filter={filters.active}
      setFilter={setFilter}
      currentFilter={filter}
    >
      Active
    </FilterItem>
    <FilterItem
      filter={filters.completed}
      setFilter={setFilter}
      currentFilter={filter}
    >
      Completed
    </FilterItem>
  </ul>
);
