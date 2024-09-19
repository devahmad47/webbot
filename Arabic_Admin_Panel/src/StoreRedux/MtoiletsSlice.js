// reducers/mtoiletsReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const mtoiletsslice = createSlice({
  name: "mtoilets",
  initialState: {
    mtoiletss: [],
  },
  reducers: {

    Addmtoilets: (state, action) => {
      state.mtoiletss = action.payload;
    },
    AddNewmtoilets: (state, action) => {
      state.mtoiletss = [action.payload, ...state.mtoiletss];
    },
    updatemtoiletss: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.mtoiletss.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.mtoiletss[index] = data;
      }
    },
    deletemtoilets: (state, action) => {
      let id = action.payload;
      const updatedmtoiletss = state.mtoiletss.filter(function (mtoilets) {
        return mtoilets._id !== id;
      });
      state.mtoiletss = updatedmtoiletss;
    },

  },
});

export const selectmtoiletss = (state) => state.mtoilets.mtoiletss;

export const { Addmtoilets, updatemtoiletss, deletemtoilets, AddNewmtoilets } = mtoiletsslice.actions; // actions
export default mtoiletsslice.reducer;
