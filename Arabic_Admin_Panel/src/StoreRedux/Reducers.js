import { combineReducers } from "redux";
import userReducer from "./UserSlice";
import adminReducer from './adminSlice';
import doorReducer from "./doorSlice"
import miqatReducer from "./miqatSlice"
import toiletReducer from "./toiletsSlice"
import madinaPlaceReducer from "./madinaPlacesSlice"
import makkhaPlaceReducer from "./makkhaPlacesSlice"
import suggestionReducer from "./suggetionsSlice"
import matoiletsReducer from "./MtoiletsSlice"
import hotelmakkhaReducer from "./hotelMakkhaSlice"
import hotelmadinahReducer from "./hotelMadinahaSlice"
import siteReducer from "./siteSlice"

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  door: doorReducer,
  miqat: miqatReducer,
  toilet: toiletReducer,
  madinaplace: madinaPlaceReducer,
  makkkhaplace: makkhaPlaceReducer,
  suggestion: suggestionReducer,
  mtoilets: matoiletsReducer,
  hotelmakkha: hotelmakkhaReducer,
  hotelmadinah: hotelmadinahReducer,
  site:siteReducer,


});

export default rootReducer;