import { Fragment, useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import apiRequest from "./components/ApiRequest.js";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import SearchItem from "./components/SearchItem";

function App() {
  const api_URL = `http://localhost:3500/items`;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

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

  // const [items, setItems] = useState(getLocalStorageItem("list"));
  const [items, setItems] = useState([]);

  const [addItem, setAddItem] = useState("");

  const [search, setSearch] = useState("");

  const fetchItem = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(api_URL);
      if (!response.ok) {
        throw Error(`Data not found`);
      }

      const data = await response.json();
      // console.log(data);

      // if (!data) {
      //   return;
      // }

      setIsError(null);
      setItems(data);
    } catch (error) {
      setIsError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // getLocalStorageItem("list");
    // set the item in local storage
    // localStorage.setItem("list", JSON.stringify(items));

    fetchItem();
  }, []);

  // useEffect(() => {
  //   // getLocalStorageItem("list");
  //   // set the item in local storage
  //   localStorage.setItem("list", JSON.stringify(items));
  // }, [items]);

  // const setLocalStorageItem = (item) => {
  //   // setItems(item);
  //   localStorage.setItem("list", JSON.stringify(item));
  // };

  const handleChecked = async (id) => {
    // console.log(id);

    const itemChecked = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    // setLocalStorageItem(itemChecked);

    setItems(itemChecked);
    // localStorage.setItem("list", JSON.stringify(itemChecked));

    const newItem = itemChecked.filter((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checked: newItem[0].checked,
      }),
    };

    const result = await apiRequest(`${api_URL}/${id}`, updateOptions);

    //  console.log();
    if (result) {
      setIsError(result);
      return;
    }
  };

  const deleteItem = async (id) => {
    // console.log(id);
    const newItems = items.filter((item) => item.id !== id);
    // setLocalStorageItem(newItems);

    setItems(newItems);
    // localStorage.setItem("list", JSON.stringify(newItems));

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await apiRequest(`${api_URL}/${id}`, deleteOptions);

    //  console.log();
    if (result) {
      setIsError(result);
      return;
    }
  };

  const addNewItem = async (item) => {
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

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };

    const result = await apiRequest(api_URL, postOptions);

    //  console.log();
    if (result) {
      setIsError(result);
      return;
    }

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

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

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
        <main>
          {isError && <p className="error">{`Error : ${isError}`}</p>}
          {!isError && !isLoading && (
            <Main
              items={items.filter((item) =>
                item.todo.toLowerCase().includes(search.toLowerCase())
              )}
              handleChecked={handleChecked}
              deleteItem={deleteItem}
            />
          )}
        </main>
        <Footer items={items} />
      </div>
      {/* <h1>Hello world</h1> */}
    </Fragment>
  );
}

export default App;
