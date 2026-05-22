import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],

  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.some(
        (product) => product._id === action.payload._id,
      );

      if (!exists) {
        state.push(action.payload);
      }
    },

    removeFavorites: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },

    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFavorites, setFavorites } =
  favoriteSlice.actions;

export const selectFavoriteProduct = (state) => state.favorites;

export default favoriteSlice.reducer;
