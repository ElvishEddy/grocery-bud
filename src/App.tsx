import { useState, useRef, useEffect } from "react";

import "./App.scss";
import List from "./components/lists/List";
import Alert from "./components/alerts/Alert";

export interface IList {
  id: string;
  title: string;
}

interface ILists {
  lists: IList[];
}
const getLocalStorage = () => {
  let lists = localStorage.getItem("lists");
  if (lists) {
    return (lists = JSON.parse(lists));
  } else {
    return [];
  }
};
function App() {
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState(getLocalStorage());
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!inputValue) {
      alert("Please enter a value");
    } else if (inputValue && isEdit) {
      setLists(
        lists.map((item: IList) => {
          if (item.id === editID) {
            return { ...item, title: inputValue };
          }
          return item;
        })
      );
      setInputValue("");
      setEditID("");
      setIsEdit(false);
      // @ts-ignore
      inputRef.current.focus();
    } else {
      const newValue = {
        id: new Date().getTime().toString(),
        title: inputValue,
      };
      setLists([...lists, newValue]);
      setInputValue("");
      // @ts-ignore
      inputRef.current.focus();
    }
  };

  const removeItem = (id: string) => {
    const newLists = lists.filter((list: IList) => list.id !== id);
    setLists(newLists);
  };
  const editItem = (id: string) => {
    const specifiedItem = lists.find((list: IList) => list.id === id);
    setIsEdit(true);
    setEditID(id);
    setInputValue(specifiedItem.title);
    // @ts-ignore
    inputRef.current.focus();
  };

  const handleOnClearAll = () => {
    setLists([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="App">
      <form className="form-submit" onSubmit={handleOnSubmit}>
        {/* <Alert /> */}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            onChange={handleOnChange}
            value={inputValue}
            ref={inputRef}
          />
          <button type="submit" className="submit-btn">
            {isEdit ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {lists && lists.length > 0 && (
        <div className="grocery-container">
          <List items={lists} editItem={editItem} removeItem={removeItem} />
          <button onClick={handleOnClearAll} className="clear">
            Clear items
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
