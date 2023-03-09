import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  firebase: {
    apiKey: "AIzaSyDbL84057E4uva1RfXya8rSvZjrPn54VhU",
    authDomain: "librusstudents.firebaseapp.com",
    projectId: "librusstudents",
    storageBucket: "librusstudents.appspot.com",
    messagingSenderId: "1091861246323",
    appId: "1:1091861246323:web:b3d876919286119f055506",
  },
};

const app = initializeApp(config.firebase);
export const auth = getAuth(app);

export default app;
export const db = getFirestore(app);
