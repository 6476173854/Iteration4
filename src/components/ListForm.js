// src/components/ListForm.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ListContext } from "../context/ListContext";
import "../styles/ListForm.css";
import "../styles/AppStyles.css";


const ListForm = () => {
  const [listName, setListName] = useState("");
  const { addList } = useContext(ListContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listName.trim()) return;
    addList(listName);
    setListName("");
    navigate("/lists");
  };

  return (
    <div className="list-form">
      <h3>Create a New List</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ListForm;
