import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [values, setValues] = useState("Context Data 1");

  const value = {
    values,
    setValues,
  };

  return <AppContext value={value}>{children}</AppContext>;
};
