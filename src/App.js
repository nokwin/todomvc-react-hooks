import React, { Fragment, useState } from "react";
import cn from "classnames";

import { Todo } from "./components/Todo";
import { todoReducer } from "./reducers/todo";
import { CreateTodo } from "./components/CreateTodo";
import { MarkAllCompleted } from "./components/MarkAllCompleted";

const filters = {
  all: "ALL",
  active: "ACTIVE",
  completed: "COMPLETED"
};

export const App = () => {
  const [filter, setFilter] = useState(filters.all);
  const [todosState, dispatch] = todoReducer();
  const allFilterClasses = cn({ selected: filter === filters.all });
  const activeFilterClasses = cn({ selected: filter === filters.active });
  const completedFilterClasses = cn({ selected: filter === filters.completed });

  function renderTodo(item) {
    return <Todo item={item} key={`todo-${item.id}`} dispatch={dispatch} />;
  }

  function getCountUncompleted() {
    return getTodos().filter(item => !item.done).length;
  }

  function selectAll() {
    setFilter(filters.all);
  }

  function selectActive() {
    setFilter(filters.active);
  }

  function selectCompleted() {
    setFilter(filters.completed);
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
                <li>
                  <a className={allFilterClasses} onClick={selectAll} href="#/">
                    All
                  </a>
                </li>
                <li>
                  <a
                    className={activeFilterClasses}
                    onClick={selectActive}
                    href="#/active"
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    className={completedFilterClasses}
                    onClick={selectCompleted}
                    href="#/completed"
                  >
                    Completed
                  </a>
                </li>
              </ul>
              <button className="clear-completed">Clear completed</button>
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
