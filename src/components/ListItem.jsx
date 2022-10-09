import React from "react";
import { BsTrash } from "react-icons/bs";

const ListItem = ({ item, handleChecked, deleteItem }) => {
  return (
    <>
      <li className="list__item">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => handleChecked(item.id)}
          name={`item__${item.id}`}
          id={`item__${item.id}`}
          className="input--check"
        />
        <label
          className="item__label"
          htmlFor={`item__${item.id}`}
          style={item.checked ? { textDecoration: "line-through" } : null}
        >
          {item.todo}
        </label>
        <BsTrash
          role="button"
          tabIndex="0"
          className="btn--delete"
          onClick={() => deleteItem(item.id)}
        />
      </li>
    </>
  );
};

export default ListItem;
