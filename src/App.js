import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const itemsData = JSON.parse(localStorage.getItem("items"));

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(itemsData);
  const [alert, setAlert] = useState({ state: false, text: "", condition: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditid] = useState(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      handleAlert(true, "Please Enter Item", "danger");
    } else if (input && isEditing) {
      setItems(
        items.map((item) => {
          if (item.id === editId) {
            return { ...item, name: input };
          }
          return item;
        })
      );
      setInput("");
      setEditid(null);
      setIsEditing(false);
    } else {
      setItems([...items, { id: new Date().getTime(), name: input }]);
      handleAlert(true, "New Item Added", "success");
      setInput("");
    }
  };

  const handleEdit = (id) => {
    let editingItem = items.find((item) => item.id === id);
    setEditid(id);
    setInput(editingItem.name);
    setIsEditing(true);
  };

  const handleClear = () => {
    setItems([]);
    handleAlert(true, "All Item Cleared", "danger");
  };

  const handleAlert = (state = false, text = "", condition = "") => {
    setAlert({ state, text, condition });
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    handleAlert(true, "Item Removed", "danger");
  };

  return (
    <main>
      <h1>React Todo App</h1>
      <section>
        {alert.state && (
          <Alert {...alert} items={items} handleAlert={handleAlert} />
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </form>
        <ul className="item-list">
          {items.map((item, index) => {
            return (
              <List
                key={index}
                item={item}
                removeItem={removeItem}
                handleEdit={handleEdit}
              />
            );
          })}
        </ul>
        {items.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            Clear All
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
