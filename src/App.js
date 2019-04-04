import React, { Fragment, useState, useReducer } from "react";
import uuid from "uuid/v1";

import { Todo } from "./components/Todo";

const actions = {
  create: "CREATE",
  toggleDone: "TOGGLE_DONE",
  toggleDoneAll: "TOGGLE_DONE_ALL"
};

const keys = {
  enter: "Enter"
};

export const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [allCompleted, setAllCompleted] = useState(false);
  const [todosState, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case actions.create:
          return {
            ...state,
            items: [
              ...state.items,
              { id: uuid(), name: action.payload, done: false }
            ]
          };
        case actions.done: {
          const index = state.items.findIndex(
            item => item.id === action.payload
          );

          return {
            ...state,
            items: Object.assign([], state.items, {
              [index]: { ...state.items[index], done: !state.items[index] }
            })
          };
        }
        case actions.toggleDoneAll:
          return {
            ...state,
            items: state.items.map(item => ({
              ...item,
              done: action.payload
            }))
          };
        default:
          return state;
      }
    },
    {
      items: []
    }
  );

  function handleChange(e) {
    setNewTodo(e.target.value);
  }

  function handleKeyPress(e) {
    // Because of safari i must compare the string
    if (e.key === keys.enter) {
      dispatch({ type: actions.create, payload: newTodo });
      setNewTodo("");
    }
  }

  function renderTodo(item) {
    return <Todo item={item} key={`todo-${item.id}`} />;
  }

  function handleCheckbox(e) {
    setAllCompleted(e.target.checked);

    dispatch({ type: actions.toggleDoneAll, payload: e.target.checked });
  }

  return (
    <Fragment>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={handleChange}
            value={newTodo}
            onKeyPress={handleKeyPress}
          />
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
