import React, { useRef } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
const AddItem = ({ handleSubmit, addItem, setAddItem }) => {
  const inputRef = useRef("");

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="addItem"></label>
        <input
          type="text"
          aria-label="add Item"
          name="addItem"
          id="addItem"
          className="form__input"
          placeholder="add item to the list"
          value={addItem}
          onChange={(e) => setAddItem(e.target.value)}
          required
          autoFocus
          ref={inputRef}
        />
        <button
          type="submit"
          aria-label="submit button"
          className="btn__submit"
          onClick={() => inputRef.current.focus()}
        >
          <AiOutlinePlusSquare />
        </button>
      </form>
    </>
  );
};

export default AddItem;
