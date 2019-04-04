import React from "react";
import cn from "classnames";

export const Todo = ({ item }) => {
  const classes = cn({ completed: item.done });

  return (
    <li className={classes}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={item.done}
          onChange={() => {}}
        />
        <label>{item.name}</label>
        <button className="destroy" />
      </div>
      <input className="edit" value="Rule the web" onChange={() => {}} />
    </li>
  );
};

{
  /* <li className="completed">
                <div className="view">
                  <input className="toggle" type="checkbox" checked />
                  <label>Taste JavaScript</label>
                  <button className="destroy" />
                </div>
                <input className="edit" value="Create a TodoMVC template" />
              </li>
              <li>
                <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>Buy a unicorn</label>
                  <button className="destroy" />
                </div>
                <input className="edit" value="Rule the web" />
              </li> */
}
