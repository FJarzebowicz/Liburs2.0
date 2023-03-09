import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, atrribute, isTeacher, username) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email,
            id: uuidv4(),
            password,
            atrribute,
            isTeacher,
            username,
          });
          alert("Welcome new User succesfuly");
        } catch (e) {
          console.error("error");
        }
      }
    );
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error);
    });
  }

  function logout() {
    return auth
      .signOut()
      .then(window.localStorage.removeItem("isLoggedIn", "false"))
      .then(window.localStorage.removeItem("isTeacher", "false"))
      .then(setIsTeacher(false), setCurrentUser(false));
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    isTeacher,
    setIsTeacher,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
