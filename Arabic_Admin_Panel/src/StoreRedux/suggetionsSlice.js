// reducers/suggestionReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const suggestionslice = createSlice({
  name: "suggestion",
  initialState: {
    suggestions: [],
  },
  reducers: {

    Addsuggestion: (state, action) => {
      state.suggestions = action.payload;
    },

    deletesuggestion: (state, action) => {
      let id = action.payload;
      const updatedsuggestions = state.suggestions.filter(function (suggestion) {
        return suggestion._id !== id;
      });
      state.suggestions = updatedsuggestions;
    },

  },
});

export const selectsuggestions = (state) => state.suggestion.suggestions;

export const { Addsuggestion, deletesuggestion } = suggestionslice.actions; // actions
export default suggestionslice.reducer;
