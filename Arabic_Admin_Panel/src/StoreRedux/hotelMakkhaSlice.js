// reducers/hotelmakkhaReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const hotelmakkhaslice = createSlice({
  name: "hotelmakkha",
  initialState: {
    hotelmakkhas: [],
  },
  reducers: {

    Addhotelmakkha: (state, action) => {
      state.hotelmakkhas = action.payload;
    },
    AddNewhotelmakkha: (state, action) => {
      state.hotelmakkhas = [action.payload, ...state.hotelmakkhas];
    },
    updatehotelmakkhas: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.hotelmakkhas.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.hotelmakkhas[index] = data;
      }
    },
    deletehotelmakkha: (state, action) => {
      let id = action.payload;
      const updatedhotelmakkhas = state.hotelmakkhas.filter(function (hotelmakkha) {
        return hotelmakkha._id !== id;
      });
      state.hotelmakkhas = updatedhotelmakkhas;
    },

    // deleteMedia: (state, action) => {
    //   const id = action.payload;
    //   state.hotelmakkhas = state.hotelmakkhas.map(hotelmakkha => {
    //     if (hotelmakkha._id.toString() === id) {
    //       // Remove the deleted media from the hotelmakkha object
    //       return {
    //         ...hotelmakkha,
    //         hotelmakkhaImage1: hotelmakkha.hotelmakkhaImage1 !== action.payload.mediaUrl ? hotelmakkha.hotelmakkhaImage1 : null,
    //         hotelmakkhaImage2: hotelmakkha.hotelmakkhaImage2 !== action.payload.mediaUrl ? hotelmakkha.hotelmakkhaImage2 : null,
    //         hotelmakkhaImage3: hotelmakkha.hotelmakkhaImage3 !== action.payload.mediaUrl ? hotelmakkha.hotelmakkhaImage3 : null,
    //         hotelmakkhaVideo: hotelmakkha.hotelmakkhaVideo !== action.payload.mediaUrl ? hotelmakkha.hotelmakkhaVideo : null,
    //       };
    //     }
    //     return hotelmakkha;
    //   });
    // },
  },
});

export const selecthotelmakkhas = (state) => state.hotelmakkha.hotelmakkhas;

export const { Addhotelmakkha, updatehotelmakkhas, deletehotelmakkha, AddNewhotelmakkha } = hotelmakkhaslice.actions; // actions
export default hotelmakkhaslice.reducer;
