// reducers/hotelmadinahReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const hotelmadinahslice = createSlice({
  name: "hotelmadinah",
  initialState: {
    hotelmadinahs: [],
  },
  reducers: {

    Addhotelmadinah: (state, action) => {
      state.hotelmadinahs = action.payload;
    },
    AddNewhotelmadinah: (state, action) => {
      state.hotelmadinahs = [action.payload, ...state.hotelmadinahs];
    },
    updatehotelmadinahs: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.hotelmadinahs.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.hotelmadinahs[index] = data;
      }
    },
    deletehotelmadinah: (state, action) => {
      let id = action.payload;
      const updatedhotelmadinahs = state.hotelmadinahs.filter(function (hotelmadinah) {
        return hotelmadinah._id !== id;
      });
      state.hotelmadinahs = updatedhotelmadinahs;
    },

    // deleteMedia: (state, action) => {
    //   const id = action.payload;
    //   state.hotelmadinahs = state.hotelmadinahs.map(hotelmadinah => {
    //     if (hotelmadinah._id.toString() === id) {
    //       // Remove the deleted media from the hotelmadinah object
    //       return {
    //         ...hotelmadinah,
    //         hotelmadinahImage1: hotelmadinah.hotelmadinahImage1 !== action.payload.mediaUrl ? hotelmadinah.hotelmadinahImage1 : null,
    //         hotelmadinahImage2: hotelmadinah.hotelmadinahImage2 !== action.payload.mediaUrl ? hotelmadinah.hotelmadinahImage2 : null,
    //         hotelmadinahImage3: hotelmadinah.hotelmadinahImage3 !== action.payload.mediaUrl ? hotelmadinah.hotelmadinahImage3 : null,
    //         hotelmadinahVideo: hotelmadinah.hotelmadinahVideo !== action.payload.mediaUrl ? hotelmadinah.hotelmadinahVideo : null,
    //       };
    //     }
    //     return hotelmadinah;
    //   });
    // },
  },
});

export const selecthotelmadinahs = (state) => state.hotelmadinah.hotelmadinahs;

export const { Addhotelmadinah, updatehotelmadinahs, deletehotelmadinah, AddNewhotelmadinah } = hotelmadinahslice.actions; // actions
export default hotelmadinahslice.reducer;
