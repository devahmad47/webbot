// reducers/doorReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const doorslice = createSlice({
  name: "door",
  initialState: {
    doors: [],
  },
  reducers: {

    Adddoor: (state, action) => {
      state.doors = action.payload;
    },
    AddNewdoor: (state, action) => {
      state.doors = [action.payload, ...state.doors];
    },
    updatedoors: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.doors.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.doors[index] = data;
      }
    },
    deletedoor: (state, action) => {
      let id = action.payload;
      const updateddoors = state.doors.filter(function (door) {
        return door._id !== id;
      });
      state.doors = updateddoors;
    },

    // deleteMedia: (state, action) => {
    //   const id = action.payload;
    //   state.doors = state.doors.map(door => {
    //     if (door._id.toString() === id) {
    //       // Remove the deleted media from the door object
    //       return {
    //         ...door,
    //         doorImage1: door.doorImage1 !== action.payload.mediaUrl ? door.doorImage1 : null,
    //         doorImage2: door.doorImage2 !== action.payload.mediaUrl ? door.doorImage2 : null,
    //         doorImage3: door.doorImage3 !== action.payload.mediaUrl ? door.doorImage3 : null,
    //         doorVideo: door.doorVideo !== action.payload.mediaUrl ? door.doorVideo : null,
    //       };
    //     }
    //     return door;
    //   });
    // },
  },
});

export const selectdoors = (state) => state.door.doors;

export const { Adddoor, updatedoors, deletedoor, AddNewdoor } = doorslice.actions; // actions
export default doorslice.reducer;
