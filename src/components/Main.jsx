import ListItem from "./ListItem";
const Main = ({ items, handleChecked, deleteItem }) => {
  return (
    <main>
      {/* <h2 className="main__heading">Hello main</h2> */}

      {items.length ? (
        <ul className="list__items">
          {items.map((item) => {
            return (
              <ListItem
                key={item.id}
                item={item}
                handleChecked={handleChecked}
                deleteItem={deleteItem}
              />
            );
          })}
        </ul>
      ) : (
        <p className="empty"> Your list is empty </p>
      )}
    </main>
  );
};

export default Main;
