import React, { Fragment, useState } from "react";

import { Todo } from "./components/Todo";
import { todoReducer, todoActions } from "./reducers/todo";
import { CreateTodo } from "./components/CreateTodo";
import { MarkAllCompleted } from "./components/MarkAllCompleted";
import { filters } from "./utils/enums";
import { FilterItem } from "./components/FilterItem";

export const App = () => {
  const [filter, setFilter] = useState(filters.all);
  const [todosState, dispatch] = todoReducer();

  function renderTodo(item) {
    return <Todo item={item} key={`todo-${item.id}`} dispatch={dispatch} />;
  }

  function getCountUncompleted() {
    return getTodos().filter(item => !item.done).length;
  }

  function getTodos() {
    return todosState.items.filter(item => {
      switch (filter) {
        case filters.active:
          return !item.done;
        case filters.completed:
          return item.done;
        default:
          return true;
      }
    });
  }

  function clearCompleted() {
    dispatch({ type: todoActions.clearCompleted });
  }

  return (
    <Fragment>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <CreateTodo dispatch={dispatch} />
        </header>
        {todosState.items.length > 0 && (
          <Fragment>
            <section className="main">
              <MarkAllCompleted dispatch={dispatch} />
              <ul className="todo-list">{getTodos().map(renderTodo)}</ul>
            </section>
            <footer className="footer">
              <span className="todo-count">
                <strong>{getCountUncompleted()}</strong> item left
              </span>
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
              <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            </footer>
          </Fragment>
        )}
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>
          Created by <a href="http://todomvc.com">you</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </Fragment>
  );
};
