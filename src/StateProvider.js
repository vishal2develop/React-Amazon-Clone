import React, { createContext, useContext, useReducer } from "react";

//prepares the data layer
export const StateContext = createContext();

// Provide data to every component requiring data from context
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// pull info from data layer
export const useStateValue = () => useContext(StateContext);
