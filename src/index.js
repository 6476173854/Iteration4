import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ListProvider } from "./context/ListContext";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";  // Add Navigate here
import ListForm from "./components/ListForm";
import ListPage from "./components/ListPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ListProvider>
        <App>
          <Routes>
            <Route path="/lists" element={<ListForm />} />
            <Route path="/lists/:id" element={<ListPage />} />
            <Route path="/" element={<Navigate to="/lists" />} />  {/* Navigate used here */}
          </Routes>
        </App>
      </ListProvider>
    </BrowserRouter>
  </React.StrictMode>
);
