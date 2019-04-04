import React, { Fragment, useState } from "react";

import { Todo } from "./components/Todo";
import { todoReducer, todoActions } from "./reducers/todo";
import { CreateTodo } from "./components/CreateTodo";

export const App = () => {
  const [allCompleted, setAllCompleted] = useState(false);
  const [todosState, dispatch] = todoReducer();

  function submitTodo(value) {
    dispatch({ type: todoActions.create, payload: value });
  }

  function renderTodo(item) {
    return <Todo item={item} key={`todo-${item.id}`} />;
  }

  function handleCheckbox(e) {
    dispatch({ type: todoActions.toggleDoneAll, payload: e.target.checked });
    setAllCompleted(e.target.checked);
  }

  return (
    <Fragment>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <CreateTodo onSubmit={submitTodo} />
        </header>
        {todosState.items.length > 0 && (
          <Fragment>
            <section className="main">
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                value={allCompleted}
                onChange={handleCheckbox}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ul className="todo-list">{todosState.items.map(renderTodo)}</ul>
            </section>
            <footer className="footer">
              <span className="todo-count">
                <strong>0</strong> item left
              </span>
              <ul className="filters">
                <li>
                  <a className="selected" href="#/">
                    All
                  </a>
                </li>
                <li>
                  <a href="#/active">Active</a>
                </li>
                <li>
                  <a href="#/completed">Completed</a>
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
