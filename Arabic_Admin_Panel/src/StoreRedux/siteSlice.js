// reducers/siteReducer.js
import { createSlice } from "@reduxjs/toolkit";
export const siteslice = createSlice({
  name: "site",
  initialState: {
    sites: [],
  },
  reducers: {
    Addsite: (state, action) => {
      state.sites = action.payload;
    },
    AddNewsite: (state, action) => {
      state.sites = [action.payload, ...state.sites];
    },
    updatesites: (state, action) => {
      let data = action.payload;
      console.log(data)
      let index = state.sites.findIndex((obj) => obj._id === data._id)
      if (index !== -1) {
        state.sites[index] = data;
      }
    },
    deletesite: (state, action) => {
      let id = action.payload;
      const updatedsites = state.sites.filter(function (site) {
        return site._id !== id;
      });
      state.sites = updatedsites;
    },
    deleteMedia: (state, action) => {
      const id = action.payload;
      state.sites = state.sites.map(site => {
        if (site._id === id) {
          // Remove the deleted media from the site object
          return {
            ...site,
            siteImage1: site.siteImage1 !== action.payload.mediaUrl ? site.siteImage1 : null,
            siteImage2: site.siteImage2 !== action.payload.mediaUrl ? site.siteImage2 : null,
            siteImage3: site.siteImage3 !== action.payload.mediaUrl ? site.siteImage3 : null,
            siteVideo: site.siteVideo !== action.payload.mediaUrl ? site.siteVideo : null,
          };
        }
        return site;
      });
    },

  },
});

export const selectsites = (state) => state.site.sites;

export const { Addsite, updatesites, deletesite, AddNewsite , deleteMedia } = siteslice.actions; // actions
export default siteslice.reducer;
