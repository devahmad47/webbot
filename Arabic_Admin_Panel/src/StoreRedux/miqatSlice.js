// reducers/miqatReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const miqatslice = createSlice({
  name: "miqat",
  initialState: {
    miqats: [],
  },
  reducers: {

    Addmiqat: (state, action) => {
      state.miqats = action.payload;
    },
    AddNewmiqat: (state, action) => {
      state.miqats = [action.payload, ...state.miqats];
    },
    updatemiqats: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.miqats.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.miqats[index] = data;
      }
    },
    deletemiqat: (state, action) => {
      let id = action.payload;
      const updatedmiqats = state.miqats.filter(function (miqat) {
        return miqat._id !== id;
      });
      state.miqats = updatedmiqats;
    },
    deleteMedia: (state, action) => {
      const id = action.payload;
      state.miqats = state.miqats.map(miqat => {
        if (miqat._id === id) {
          // Remove the deleted media from the miqat object
          return {
            ...miqat,
            miqatImage1: miqat.miqatImage1 !== action.payload.mediaUrl ? miqat.miqatImage1 : null,
            miqatImage2: miqat.miqatImage2 !== action.payload.mediaUrl ? miqat.miqatImage2 : null,
            miqatImage3: miqat.miqatImage3 !== action.payload.mediaUrl ? miqat.miqatImage3 : null,
            miqatVideo: miqat.miqatVideo !== action.payload.mediaUrl ? miqat.miqatVideo : null,
          };
        }
        return miqat;
      });
    },

  },
});

export const selectmiqats = (state) => state.miqat.miqats;

export const { Addmiqat, updatemiqats, deletemiqat, AddNewmiqat , deleteMedia } = miqatslice.actions; // actions
export default miqatslice.reducer;
