import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  books: [],
  readingBooks: [],
  selectedBook: null,
};

const slice = createSlice({
  name: "book",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedBook = action.payload;
    },
    getBooksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.books = action.payload;
    },
    getReadingBooksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.readingBooks = action.payload;
    },
    addReadingBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newBook = action.payload;
      state.readingBooks.push(newBook);
    },
    removeReadingBookSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { removedBookId } = action.payload;
      const readingList = state.readingBooks;
      delete readingList[
        state.readingBooks.findIndex((book) => book.id === removedBookId)
      ];
      state.readingBooks = readingList.filter(
        (book) => typeof book !== "undefined"
      );
    },
  },
});

export const getBooks =
  ({ pageNum, limit, query }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { pageNum, limit };
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const response = await apiService.get(url, {
        params,
      });
      dispatch(slice.actions.getBooksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getBook = (bookId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/books/${bookId}`);
    console.log(response.data);
    dispatch(slice.actions.getBookSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getReadingBooks = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/favorites`);
    dispatch(slice.actions.getReadingBooksSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const addReadingBook = (addingBook) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post(`/favorites`, addingBook);
    dispatch(slice.actions.addReadingBookSuccess(response.data));
    toast.success("The book has been added to the reading list!");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const removeReadingBook = (removedBookId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/favorites/${removedBookId}`);
    dispatch(
      slice.actions.removeReadingBookSuccess({
        removedBookId,
      })
    );
    toast.success("The book has been removed");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};
export default slice.reducer;
