import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null); // Add selectedListId state

  useEffect(() => {
    // Load lists from localStorage when the app is first loaded
    const savedLists = JSON.parse(localStorage.getItem("lists")) || [];
    setLists(savedLists);
  }, []);

  useEffect(() => {
    // Save lists to localStorage whenever lists change
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addList = (name) => {
    const newList = { id: Date.now(), name, items: [] };
    setLists([...lists, newList]);
  };

  const updateList = (updatedList) => {
    const updatedLists = lists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    setLists(updatedLists);
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        addList,
        updateList,
        deleteList,
        selectedListId, // Provide the selectedListId
        setSelectedListId, // Provide the setSelectedListId function
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
