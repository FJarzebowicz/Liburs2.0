import React, { useContext, useState } from "react";

export const ModalContext = React.createContext();

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalContextProvider({ children }) {
  const [modalObject, setModalObject] = useState();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  const handleModalObject = (obj) => {
    console.log(obj);
    setModalObject(obj);
  };
  const openGradeModal = () => {
    setIsGradeModalOpen(true);
  };
  const closeGradeModal = () => {
    setIsGradeModalOpen(false);
  };
  const value = {
    handleModalObject,
    modalObject,
    isGradeModalOpen,
    closeGradeModal,
    openGradeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
