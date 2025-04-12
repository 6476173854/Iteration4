// src/components/NavBar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../context/ListContext";

import "../styles/ListForm.css";
import "../styles/AppStyles.css";


const NavBar = () => {
  const { lists } = useContext(ListContext);

  return (
    <nav className="navbar">
  <div className="navbar-container">
    <h2><span className="navbar-brand">📋 Task Manager By Avneet Kaur</span></h2>
    <div className="new-list-container">
      <Link to="/lists">+ New List</Link>
    </div>
    <ul className="navbar-links">
      {lists.map((list, index) => (
        <li key={list.id}>
          <Link to={`/lists/${list.id}`}>{index + 1}. {list.name}</Link>
        </li>
      ))}
    </ul>
  </div>
</nav>

  );
};

export default NavBar;