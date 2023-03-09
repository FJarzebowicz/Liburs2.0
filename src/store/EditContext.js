import React, { useContext, useState } from "react";

export const EditContext = React.createContext();

export function useEditContext() {
  return useContext(EditContext);
}

export function EditContextProvider({ children }) {
  const [object, setObject] = useState();

  const value = {
    object,
    setObject,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}
