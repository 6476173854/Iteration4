// src/components/ListPage.js
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ListContext } from "../context/ListContext";
import "../styles/ListPage.css";
import "../styles/AppStyles.css";


const ListPage = () => {
  const { id } = useParams();
  const {
    lists,
    updateList,
    deleteList,
    setSelectedListId,
  } = useContext(ListContext);
  const list = lists.find((l) => l.id === parseInt(id));

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState(1);
  const [showCompleted, setShowCompleted] = useState(true);

  if (!list) return <p className="container mt-4">List not found</p>;

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newItem = {
      id: Date.now(),
      task,
      priority: parseInt(priority),
      completed: false,
    };
    const updatedList = {
      ...list,
      items: [...list.items, newItem],
    };
    updateList(updatedList);
    setTask("");
    setPriority(1);
  };

  const toggleComplete = (itemId) => {
    const updatedItems = list.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    updateList({ ...list, items: updatedItems });
  };

  const deleteItem = (itemId) => {
    const updatedItems = list.items.filter((item) => item.id !== itemId);
    updateList({ ...list, items: updatedItems });
  };

  const sortedItems = [...list.items].sort((a, b) => a.priority - b.priority);
  const visibleItems = showCompleted
    ? sortedItems
    : sortedItems.filter((item) => !item.completed);

  return (
    <div className="container mt-4">
      <h3>{list.name}</h3>

      <form onSubmit={handleAddItem} className="row g-2 align-items-center mb-3">
        <div className="col">
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">
            Add Task
          </button>
        </div>
      </form>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
          id="showCompleted"
        />
        <label className="form-check-label" htmlFor="showCompleted">
          Show Completed
        </label>
      </div>

      <ul className="list-group">
        {visibleItems.map((item) => (
          <li
            key={item.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${item.completed ? "list-group-item-success text-decoration-line-through" : ""}`}
          >
            <span>
              {item.task} (Priority: {item.priority})
            </span>
            <div>
              <button
                onClick={() => toggleComplete(item.id)}
                className="btn btn-warning btn-sm me-2"
              >
                {item.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          deleteList(list.id);
          setSelectedListId(null);
        }}
        className="btn btn-danger mt-4"
      >
        Delete List
      </button>
    </div>
  );
};

export default ListPage;
