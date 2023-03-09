import { createSlice } from "@reduxjs/toolkit";
import { menuState } from "./menuTypes";

const initialState: menuState = {
  categories: [
    "Dashboard",
    "Grades",
    "Schedule",
    "Attendance",
    "Calendar",
    "Homework",
    "Account",
  ],
  categoriesT: ["Dashboard", "ManageClasses", "Schedule", "Users", "Account"],
  isTOpened: false,
  isOpened: false,
};

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    setIsMenuOpen(state, action) {
      state.isOpened = action.payload;
    },
    setIsTMenuOpen(state, action) {
      state.isTOpened = action.payload;
    },
  },
});

export const { setIsMenuOpen } = menuSlice.actions;
export const { setIsTMenuOpen } = menuSlice.actions;

export const selectMenuCategories = (state: menuState) => state.categories;
export const selectMenuIsOpened = (state: menuState) => state.isOpened;

export default menuSlice.reducer;
