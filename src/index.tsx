import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./store/authContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { PickedClassProvider } from "./store/pickedClass";
import { PickedUserProvider } from "./store/pickedUser";
import { ModalContextProvider } from "./store/ModalContext";
import { EditContextProvider } from "./store/EditContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store()}>
      <AuthProvider>
        <PickedClassProvider>
          <PickedUserProvider>
            <EditContextProvider>
              <ModalContextProvider>
                <App />
              </ModalContextProvider>
            </EditContextProvider>
          </PickedUserProvider>
        </PickedClassProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
