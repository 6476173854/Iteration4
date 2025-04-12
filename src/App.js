import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navbar";  // Keep import consistent with PascalCase

import Footer from "./components/Footer";
import ListPage from "./components/ListPage";
import ListForm from "./components/ListForm";

const App = () => {
  return (
    <div>
      <NavBar /> {/* NavBar will be visible on all pages */}
      <div className="main-content">
        {/* The routes (children) will be rendered here */}
        <Routes>
          <Route path="/lists" element={<ListForm />} />
          <Route path="/lists/:id" element={<ListPage />} />
          {/* Redirect to the first list if no route matches */}
          <Route path="/" element={<Navigate to="/lists" />} />
        </Routes>
      </div>
      <Footer /> {/* Footer will be visible on all pages */}
    </div>
  );
};

export default App;
