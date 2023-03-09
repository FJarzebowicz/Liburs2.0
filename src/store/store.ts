import { configureStore } from "@reduxjs/toolkit";

import { menuSlice } from "./utilitySlices/menuSlice";

const store = () =>
  configureStore({
    reducer: {
      menuSlice: menuSlice.reducer,
    },
  });

export default store;
