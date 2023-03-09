import React, { useContext, useState } from "react";

const PickedUserContext = React.createContext();

export function usePickedUser() {
  return useContext(PickedUserContext);
}

export function PickedUserProvider({ children }) {
  const [pickedUser, setPickedUser] = useState();
  const [modalObject, setModalObject] = useState();

  async function handlePickedUser(user) {
    console.log(user);
    setPickedUser(user);
  }
  async function handleModalObject(obj) {
    console.log(obj);
    setModalObject(obj);
  }

  const value = {
    pickedUser,
    handlePickedUser,
    handleModalObject,
    modalObject,
  };
  return (
    <PickedUserContext.Provider value={value}>
      {children}
    </PickedUserContext.Provider>
  );
}
