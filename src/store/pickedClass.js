import React, { useContext, useState } from "react";

const PickedClassContext = React.createContext();

export function usePickedClas() {
  return useContext(PickedClassContext);
}

export function PickedClassProvider({ children }) {
  const [pickedClas, setPickedClas] = useState();
  const [students, setStudents] = useState();

  async function handlePickedClas(clas) {
    console.log(clas);
    setPickedClas(clas);
  }

  const value = {
    pickedClas,
    students,
    handlePickedClas,
  };
  return (
    <PickedClassContext.Provider value={value}>
      {children}
    </PickedClassContext.Provider>
  );
}
