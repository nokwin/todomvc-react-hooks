import { useReducer } from "react";
import uuid from "uuid/v1";

export const todoActions = {
  create: "CREATE",
  toggleDone: "TOGGLE_DONE",
  toggleDoneAll: "TOGGLE_DONE_ALL"
};

export const todoReducer = () =>
  useReducer(
    (state, action) => {
      switch (action.type) {
        case todoActions.create:
          return {
            ...state,
            items: [
              ...state.items,
              { id: uuid(), name: action.payload, done: false }
            ]
          };
        case todoActions.done: {
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
        case todoActions.toggleDoneAll:
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
