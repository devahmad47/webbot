import { Navigate } from "react-router-dom";
import UserDetails from "../UserDetails";
import Error from "../Error";
import { AdminLayout } from "./FullLayoutAdmin";
import Statistics from "../Sidebar Pages/Statistics";
import Users from "../Sidebar Pages/Users";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";

import Suggestions from "../Sidebar Pages/suggestions/suggestion";

import AddDoors from "../Sidebar Pages/Doors/AddDoors";
import Doors from "../Sidebar Pages/Doors/doors";
import { DoorInfo } from "../Sidebar Pages/Doors/doorInfo";
import Editdoor from "../Sidebar Pages/Doors/EditDoor";

import AddMiqats from "../Sidebar Pages/Miqat/addMiqat";
import Editmiqat from "../Sidebar Pages/Miqat/editMiqat"; 
import { Miqats } from "../Sidebar Pages/Miqat/miqats";  
import { MiqatInfo } from "../Sidebar Pages/Miqat/miqatInfo";

import Addtoilets from "../Sidebar Pages/Toilets/addToilets";
import Edittoilet from "../Sidebar Pages/Toilets/editToilets";
import { Toilets } from "../Sidebar Pages/Toilets/Toilets";
import { ToiletInfo } from "../Sidebar Pages/Toilets/ToiletsInfo";

import MadinaInfoPlaces, { MadinaPlaces } from "../Sidebar Pages/otherInfo/MadinaInfoPlaces";
import { MakkkhaPlaces } from "../Sidebar Pages/otherInfo/MakkhaInfoPlaces";

import Addhotels from "../Sidebar Pages/Hotels/addHotels";
import { Hotels } from "../Sidebar Pages/Hotels/Hotels";
import Edithotel from "../Sidebar Pages/Hotels/editHotels";
import { HotelInfo } from "../Sidebar Pages/Hotels/HotelsInfo";
import AddSite from "../Sidebar Pages/Sites/AddSite";
import Site from "../Sidebar Pages/Sites/Site";
import EditSite from "../Sidebar Pages/Sites/EditSite";
import { SiteInfo } from "../Sidebar Pages/Sites/SiteInfo";
import AddInfo from "../Sidebar Pages/otherInfo/AddInfo";
import { PlacesInfo } from "../Sidebar Pages/otherInfo/PlacesInfo";
import EditInfo from "../Sidebar Pages/otherInfo/EditInfo";
import FirebaseUsers from "../Sidebar Pages/FirebaseUsers";





export const ThemeRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="starter" /> },

      // { path: "AdminDashboard/starter", exact: true, element: <PrivateRouteAdmin element={<Starter />} /> },
      { path: "starter", exact: true, element: <PrivateRouteAdmin element={<Statistics />} /> },
      { path: "userdetails/:id", exact: true, element: <PrivateRouteAdmin element={<UserDetails />} /> },
      { path: "Suggestions", exact: true, element: <PrivateRouteAdmin element={<Suggestions />} /> },

      { path: 'AddDoors', exact: true, element: <PrivateRouteAdmin element={<AddDoors />} /> },
      { path: 'Doors', exact: true, element: <PrivateRouteAdmin element={<Doors />} /> },
      { path: "doorInfo/:doorId", exact: true, element: <PrivateRouteAdmin element={<DoorInfo />} /> },
      { path: "Editdoor/:doorId", exact: true, element: <PrivateRouteAdmin element={<Editdoor />} /> },

      { path: 'AddMiqats', exact: true, element: <PrivateRouteAdmin element={<AddMiqats />} /> },
      { path: "Miqats", exact: true, element: <PrivateRouteAdmin element={<Miqats />} /> },
      { path: "Editmiqat/:miqatId", exact: true, element: <PrivateRouteAdmin element={<Editmiqat />} /> },
      { path: "MiqatInfo/:miqatId", exact: true, element: <PrivateRouteAdmin element={<MiqatInfo />} /> },

      { path: 'Addtoilets', exact: true, element: <PrivateRouteAdmin element={<Addtoilets />} /> },
      { path: "Toilets", exact: true, element: <PrivateRouteAdmin element={<Toilets />} /> },
      { path: "Edittoilet/:originCity/:toiletId", exact: true, element: <PrivateRouteAdmin element={<Edittoilet />} /> },
      { path: "ToiletInfo/:originCity/:toiletId", exact: true, element: <PrivateRouteAdmin element={<ToiletInfo />} /> },

      { path: 'Addsite', exact: true, element: <PrivateRouteAdmin element={<AddSite />} /> },
      { path: "sites", exact: true, element: <PrivateRouteAdmin element={<Site />} /> },
      { path: "EditSite/:siteId", exact: true, element: <PrivateRouteAdmin element={<EditSite />} /> },
      { path: "siteInfo/:siteId", exact: true, element: <PrivateRouteAdmin element={<SiteInfo />} /> },

      { path: 'AddInfo', exact: true, element: <PrivateRouteAdmin element={<AddInfo />} /> },
      { path: "editInfo/:InfoOrigin/:placeId", exact: true, element: <PrivateRouteAdmin element={<EditInfo />} /> },
      { path: "MakkkhaPlaces", exact: true, element: <PrivateRouteAdmin element={<MakkkhaPlaces />} /> },
      { path: "MadinaPlaces", exact: true, element: <PrivateRouteAdmin element={<MadinaInfoPlaces />} /> },
      // { path: "placesInfo", exact: true, element: <PrivateRouteAdmin element={<PlacesInfo />} /> },

      { path: 'Addhotels', exact: true, element: <PrivateRouteAdmin element={<Addhotels />} /> },
      { path: "hotels", exact: true, element: <PrivateRouteAdmin element={<Hotels />} /> },
      { path: "Edithotel/:originCity/:hotelId", exact: true, element: <PrivateRouteAdmin element={<Edithotel />} /> },
      { path: "hotelInfo/:originCity/:hotelId", exact: true, element: <PrivateRouteAdmin element={<HotelInfo />} /> },

      { path: "placesInfo", exact: true, element: <PrivateRouteAdmin element={<PlacesInfo />} /> },
      { path: "hotelInfo/:InfoOrigin/:placeId", exact: true, element: <PrivateRouteAdmin element={<HotelInfo />} /> },


      { path: 'users', exact: true, element: <PrivateRouteAdmin element={<Users />} /> },
      { path: "*", exact: true, element: <Error /> },
      // { path: "starter", exact: true, element: <Statistics /> },
    ],
  },
];


