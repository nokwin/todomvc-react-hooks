import uuid from "uuid/v1";
import { decorate, observable, action, computed } from "mobx";

import { filters } from "../utils/enums";

export class TodoStore {
  items = [];
  filter = filters.all;

  get countUncompleted() {
    return this.items.filter(item => !item.done).length;
  }

  get todos() {
    return this.items.filter(item => {
      switch (this.filter) {
        case filters.active:
          return !item.done;
        case filters.completed:
          return item.done;
        default:
          return true;
      }
    });
  }

  addTodo(name) {
    this.items.push({
      id: uuid(),
      name,
      done: false
    });
  }

  toggleDone(id) {
    const index = this.items.findIndex(item => item.id === id);

    this.items = Object.assign([], this.items, {
      [index]: { ...this.items[index], done: !this.items[index].done }
    });
  }

  toggleDoneAll(done) {
    this.items = this.items.map(item => ({
      ...item,
      done: done
    }));
  }

  delete(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  edit(id, name) {
    const index = this.items.findIndex(item => item.id === id);

    this.items = Object.assign([], this.items, {
      [index]: { ...this.items[index], name }
    });
  }

  clearCompleted() {
    this.items = this.items.filter(item => !item.done);
  }

  changeFilter(filter) {
    this.filter = filter;
  }
}

decorate(TodoStore, {
  items: observable,
  filter: observable,
  countUncompleted: computed,
  todos: computed,
  addTodo: action.bound,
  toggleDone: action.bound,
  toggleDoneAll: action.bound,
  toggleDelete: action.bound,
  edit: action.bound,
  clearCompleted: action.bound,
  changeFilter: action.bound
});
