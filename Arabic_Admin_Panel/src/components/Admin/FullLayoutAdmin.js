/* eslint-disable flowtype/require-valid-file-annotation */
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Loader } from "../Loader/loader";
import axios from "axios";
// import { serverUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  Adduser, selectUsers, addActiveUsers
} from "../../StoreRedux/UserSlice";

// import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar Pages/SideBar";
import { Adddoor, selectdoors } from "../../StoreRedux/doorSlice";
import { selectmiqats, Addmiqat } from "../../StoreRedux/miqatSlice";
import { selecttoilets, Addtoilet } from "../../StoreRedux/toiletsSlice";
import { selectmadinaplaces, Addmadinaplace } from "../../StoreRedux/madinaPlacesSlice";
import { selectmakkkhaplaces, Addmakkkhaplace } from "../../StoreRedux/makkhaPlacesSlice";
import { selectsuggestions, Addsuggestion } from "../../StoreRedux/suggetionsSlice";
import { Addmtoilets } from "../../StoreRedux/MtoiletsSlice";
import { Addhotelmakkha } from "../../StoreRedux/hotelMakkhaSlice";
import { Addhotelmadinah } from "../../StoreRedux/hotelMadinahaSlice";
import { Addsite } from "../../StoreRedux/siteSlice";
import {selectsites} from "../../StoreRedux/siteSlice"
const serverUrl = process.env.REACT_APP_Server_Url

export const AdminLayout = () => {
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();
  const storeAllUsers = useSelector(selectUsers);
  const storeDoors = useSelector(selectdoors);
  const storesites = useSelector(selectsites);
  const storeMiqats = useSelector(selectmiqats);
  const storeToilets = useSelector(selecttoilets);
  const storeMadinPlaces = useSelector(selectmadinaplaces);
  const storeMakkhaPlaces = useSelector(selectmakkkhaplaces);
  const storeSuggestions = useSelector(selectsuggestions);
  // const storeallactiveusers = useSelector(selectActiveUsers);
  //////////////////////////////fetch total users/////////////////////////////////////////////
  useEffect(() => {
    const fetchactiveUsers = async () => {

      try {
        const response = await axios.get(
          `${serverUrl}/api/users/active-users`
        );
        if (response && response.status === 200) {
          setloader(false);
          dispatch(addActiveUsers(response.data.activeUsers));
          // toast.success("activeUsers Fetch Successfully");
        }
      } catch (error) {
        setloader(false);
        if (error.response) {
          // toast.error("Failed to Fetch activeUsers");
        } else {
          // toast.error("Failed to Fetch activeUsers");
        }
      }
    };
    fetchactiveUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get(
          `${serverUrl}/api/users/get_all_users`
        );
        if (response && response.status === 200) {
          setloader(false);
          dispatch(Adduser(response.data.users));

          // toast.success("Users Fetch Successfully");
        }
      } catch (error) {
        setloader(false);
        if (error.response) {
          // toast.error("Failed to Fetch Users");
        } else {
          // toast.error("Failed to Fetch Users");
        }
      }
    };

    if (storeAllUsers.length === 0) {
      fetchUsers();
    }
  }, [dispatch, storeAllUsers]);
  
// fetch all site ///////////////////////////////////////////////////

useEffect(() => {
  const fetchSites= async ()=>{
    try {
      const response=await axios.get(
        `${serverUrl}/api/sites/get-all-sites`
      );
      if (response && response.status ===200){
        setloader(false)
        dispatch(Addsite(response.data.sites))
        // toast.success("Sites fetched")
      }
    } catch (error) {
      setloader(false)
      if(error.response){
        // toast.error("failed to fetch sites")
      }
    }
  }

  if(storesites.length===0){
    fetchSites()
  }
}, [])

  ////////////////////////fetch active users last week//////////////////////////////////////
  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/doors/get-all-doors`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Adddoor(response.data.doors));

          // toast.success("Doors fetched");
        }
      } catch (error) {
        setloader(false);
        if (error.response) {
          // toast.error("Failed to Fetch Doors");
        }
      }
    };

    if (storeDoors.length === 0) {
      fetchDoors();
    }
  }, []);

  useEffect(() => {
    const fetchMiqats = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/miqats/get-all-miqats`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addmiqat(response.data.miqats));

          // toast.success("miqats fetched");
        }
      } catch (error) {
        setloader(false);
        if (error.response) {
          // toast.error("Failed to Fetch miqats");
        }
      }
    };

    if (storeMiqats.length === 0) {
      fetchMiqats();
    }
  }, []);

  useEffect(() => {
    const fetchToilets = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/toilets/get-all-toilets`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addtoilet(response.data.toilets));

          // toast.success("toilets fetched");
        }
      } catch (error) {
        setloader(false);
        if (error.response) {
          // toast.error("Failed to Fetch toilets");
        }
      }
    };

    if (storeToilets.length === 0) {
      fetchToilets();
    }
  }, []);

  useEffect(() => {
    const fetchMadinaPlaces = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/paratical-info/get-medina-places`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addmadinaplace(response.data.details));

          // toast.success("medina fetched");
        }
      } catch (error) {
        setloader(false);
        
        if (error.response) {
          // toast.error("Failed to Fetch medina");
        }
      }
    };

    if (storeMadinPlaces.length === 0) {
      fetchMadinaPlaces();
    }
  }, []);


  useEffect(() => {
    const fetchMakkhaPlaces = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/paratical-info/get-makkha-places`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addmakkkhaplace(response.data.details));

          // toast.success("makkha fetched");
        }
      } catch (error) {
        setloader(false);
        
        if (error.response) {
          // toast.error("Failed to Fetch makkha");
        }
      }
    };

    if (storeMakkhaPlaces.length === 0) {
      fetchMakkhaPlaces();
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/suggestion/get-all-suggestion`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addsuggestion(response.data.allSuggestion));

          // toast.success("makkha fetched");
        }
      } catch (error) {
        setloader(false);
        if (error.response) {
          // toast.error("Failed to Fetch makkha");
        }
      }
    };

    if (storeSuggestions.length === 0) {
      fetchSuggestions();
    }
  }, []);

  useEffect(() => {
    const fetchMtoilets = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/toiletsMadina/get-all-toilets`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addmtoilets(response.data.toilets));

          // toast.success("Madina Toilets");
        }
      } catch (error) {
        setloader(false);
        
        if (error.response) {
          // toast.error("Failed to Fetch Madina Toilets");
        }
      }
    };

    if (storeSuggestions.length === 0) {
      fetchMtoilets();
    }
  }, []);
  useEffect(() => {
    const fetchhotelMadina = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/hotels/get-hotels-madina`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addhotelmadinah(response.data.hotels));

          // toast.success("Madina Hotels");
        }
      } catch (error) {
        setloader(false);
        
        if (error.response) {
          // toast.error("Failed to Fetch Madina Hotels");
        }
      }
    };

    if (storeSuggestions.length === 0) {
      fetchhotelMadina();
    }
  }, []);
  useEffect(() => {
    const fetchMakkha = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/hotels/get-hotels-makkha`
        );
        if (response && response.status === 200) {
          setloader(false);

          dispatch(Addhotelmakkha(response.data.hotels));

          // toast.success("Makkha Hotels");
        }
      } catch (error) {
        setloader(false);
        
        if (error.response) {
          // toast.error("Failed to Fetch Makkha Hotels");
        }
      }
    };

    if (storeSuggestions.length === 0) {
      fetchMakkha();
    }
  }, []);
  /////////////////////////////// fetch all deals /////////////////////////////////

  /////////////////////////////// fetch all deals /////////////////////////////////



  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-white-600">
        <Sidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet />
        </main>
        <Loader loading={loader}></Loader>
      </div>
    </>
  );
};


