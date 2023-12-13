import { createSlice } from "@reduxjs/toolkit";
export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {}, //images path //profil image path //movie poster path
    genres: {}, //like comedy,action=>data like id
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload; //store the data in url
    },
    getGenres: (state, action) => {
      state.genres = action.payload; // store data in genres
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
