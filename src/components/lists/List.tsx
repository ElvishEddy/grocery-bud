import React from "react";

import { IList } from "../../App";
import { FaTrash, FaRegEdit } from "react-icons/fa";

interface IListProps {
  items: IList[];
  editItem: (id: string) => void;
  removeItem: (id: string) => void;
}
export default function List(props: IListProps) {
  const { items, editItem, removeItem } = props;

  return (
    <div className="grocery-lists">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="btn-trash"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
              <button
                type="button"
                className="btn-edit"
                onClick={() => editItem(id)}
              >
                <FaRegEdit />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
