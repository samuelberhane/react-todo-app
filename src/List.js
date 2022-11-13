import React from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const List = ({ item, removeItem, handleEdit }) => {
  return (
    <li className="list">
      <p>{item.name}</p>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => handleEdit(item.id)}>
          <MdOutlineEditNote />
        </button>
        <button
          className="del-btn"
          onClick={() => {
            removeItem(item.id);
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default List;
