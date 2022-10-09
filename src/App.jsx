import { Fragment, useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import SearchItem from "./components/SearchItem";

function App() {
  const getLocalStorageItem = (item) => {
    if (!localStorage.getItem(item)) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem(item));
    }
  };
  // const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     checked: false,
  //     todo: "javascript learn",
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     todo: "HTML learn",
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     todo: "CSS learn",
  //   },
  //   {
  //     id: 4,
  //     checked: false,
  //     todo: "React learn",
  //   },
  // ]);

  // console.log(getLocalStorageItem("list"));

  const [items, setItems] = useState(getLocalStorageItem("list"));

  const [addItem, setAddItem] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    // getLocalStorageItem("list");
    // set the item in local storage
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  // const setLocalStorageItem = (item) => {
  //   // setItems(item);
  //   localStorage.setItem("list", JSON.stringify(item));
  // };

  const handleChecked = (id) => {
    // console.log(id);

    const itemChecked = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    // setLocalStorageItem(itemChecked);

    setItems(itemChecked);
    // localStorage.setItem("list", JSON.stringify(itemChecked));
  };

  const deleteItem = (id) => {
    // console.log(id);
    const newItems = items.filter((item) => item.id !== id);
    // setLocalStorageItem(newItems);

    setItems(newItems);
    // localStorage.setItem("list", JSON.stringify(newItems));
  };

  const addNewItem = (item) => {
    // console.log(item);
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    // console.log(id);
    const newItem = { id, checked: false, todo: item };
    // console.log("🚀 ~ file: App.jsx ~ line 66 ~ addNewItem ~ newItem", newItem);
    const newListItems = [...items, newItem];
    // console.log(
    //   "🚀 ~ file: App.jsx ~ line 67 ~ addNewItem ~ newListItems",
    //   newListItems
    // );
    // setLocalStorageItem(newListItems);
    setItems(newListItems);
    // localStorage.setItem("list", JSON.stringify(newListItems));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("click");
    // console.log(e);
    // console.log(addItem);

    addNewItem(addItem);
    setAddItem("");
  };

  return (
    <Fragment>
      <div className="app">
        <Header />
        <AddItem
          handleSubmit={handleSubmit}
          addItem={addItem}
          setAddItem={setAddItem}
        />
        <SearchItem search={search} setSearch={setSearch} />
        <Main
          items={items.filter((item) =>
            item.todo.toLowerCase().includes(search.toLowerCase())
          )}
          handleChecked={handleChecked}
          deleteItem={deleteItem}
        />
        <Footer items={items} />
      </div>
      {/* <h1>Hello world</h1> */}
    </Fragment>
  );
}

export default App;
