import { configureStore } from "@reduxjs/toolkit";
import listsSlice from "./lists";

export const store = configureStore({
   reducer: {
      lists: listsSlice,
   },
});
