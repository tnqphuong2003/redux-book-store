import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/bookSlice";

const rootReducer = {
  book: bookReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
