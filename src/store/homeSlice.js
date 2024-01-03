import { createSlice } from "@reduxjs/toolkit";
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
    console.log(serializedState);
  } catch (err) {
    // Handle errors while saving to local storage
    console.error("Error saving state to local storage:", err);
  }
};

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {}, //images path //profil image path //movie poster path
    genres: {}, //like comedy,action=>data like id
    history: loadState()?.home?.history || [],
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload; //store the data in url
    },
    getGenres: (state, action) => {
      state.genres = action.payload; // store data in genres
    },
    getHistory: (state, action) => {
      state.history.push(action.payload);
      saveState({ home: { ...state, history: state.history } });
    },
    setHistory: (state, action) => {
      state.history = action.payload;
      saveState({ home: { ...state, history: state.history } });
    },
  },
});

export const { getApiConfiguration, getGenres, getHistory, setHistory } =
  homeSlice.actions;

export default homeSlice.reducer;
