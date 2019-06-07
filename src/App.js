import React, { Fragment, useCallback } from "react";
import { observer } from "mobx-react-lite";

import { Todo } from "./components/Todo";
import { CreateTodo } from "./components/CreateTodo";
import { MarkAllCompleted } from "./components/MarkAllCompleted";
import { Filters } from "./components/Filters";

export const AppComponent = ({ store }) => {
  const renderTodo = useCallback(item => <Todo item={item} key={`todo-${item.id}`} store={store} />, [store.todos]);

  return (
    <Fragment>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <CreateTodo store={store} />
        </header>
        {store.items.length > 0 && (
          <Fragment>
            <section className="main">
              <MarkAllCompleted store={store} />
              <ul className="todo-list">{store.todos.map(renderTodo)}</ul>
            </section>
            <footer className="footer">
              <span className="todo-count">
                <strong>{store.countUncompleted}</strong> item left
              </span>
              <Filters filter={store.filter} setFilter={store.changeFilter} />
              <button
                className="clear-completed"
                onClick={store.clearCompleted}
              >
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

export const App = observer(AppComponent);
