import React from "react";
import axios from "axios";
// import { serverUrl } from "../config";
import { deleteUser } from "../StoreRedux/UserSlice";
import { useDispatch, } from "react-redux";
import { toast } from "react-toastify";
// import { deletedeal } from "../StoreRedux/dealSlice";
import { deletedoor ,  } from "../StoreRedux/doorSlice";
import { deletemiqat } from "../StoreRedux/miqatSlice";
import { deletetoilet } from "../StoreRedux/toiletsSlice";
import { deletemtoilets } from "../StoreRedux/MtoiletsSlice";
import { deletemadinaplace } from "../StoreRedux/madinaPlacesSlice";
import { deletemakkkhaplace } from "../StoreRedux/makkhaPlacesSlice";
import { deletesuggestion } from "../StoreRedux/suggetionsSlice";
import { deletehotelmadinah } from "../StoreRedux/hotelMadinahaSlice";
import { deletehotelmakkha } from "../StoreRedux/hotelMakkhaSlice";
import { deletesite } from "../StoreRedux/siteSlice";
const serverUrl = process.env.REACT_APP_Server_Url
const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const { setloading, delId, setshowModal } = props;
  const handleDeleteClick = async () => {
    setloading(true);
    try {
      if (props.whatdelete === "user") {
        const delResponse = await axios.delete(
          `${serverUrl}/api/users/${delId}/delete_user`
        );
        if (delResponse.status === 200) {
          dispatch(deleteUser(delId));
          toast.success("User deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete user");
          setloading(false);

        }
      }
      else if (props.whatdelete === "door") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/doors/${delId}/delete_door`
        );
        if (delResponse.status === 200) {
          dispatch(deletedoor(delId));
          toast.success("deal deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete deal");
          setloading(false);

        }
      }
      else if (props.whatdelete === "site") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/sites/${delId}/delete-site`
        );
        if (delResponse.status === 200) {
          dispatch(deletesite(delId));
          console.log("click site delte")
          toast.success("site deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete site");
          setloading(false);

        }
      }
      else if (props.whatdelete === "miqat") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/miqats/${delId}/delete-miqat`
        );
        if (delResponse.status === 200) {
          dispatch(deletemiqat(delId));
          toast.success("miqats deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete miqats");
          setloading(false);

        }
      }
      else if (props.whatdelete === "Makkahtoilet") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/toilets/${delId}/delete-toilet`
        );
        if (delResponse.status === 200) {
          dispatch(deletetoilet(delId));
          toast.success("toilet deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete toilet");
          setloading(false);

        }
      }
      else if (props.whatdelete === "Madinahtoilet") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/toiletsMadina/${delId}/delete-toilet`
        );
        if (delResponse.status === 200) {
          dispatch(deletemtoilets(delId));
          toast.success("toilet deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete toilet");
          setloading(false);

        }
      }
      else if (props.whatdelete === "makkkhaPlace") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/paratical-info/${delId}/delete-makkha-places`
        );
        if (delResponse.status === 200) {
          dispatch(deletemakkkhaplace(delId));
          toast.success("place deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete place");
          setloading(false);

        }
      }
      else if (props.whatdelete === "madinaPlace") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/paratical-info/${delId}/delete-madina-places`
        );
        if (delResponse.status === 200) {
          dispatch(deletemadinaplace(delId));
          toast.success("place deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete place");
          setloading(false);

        }
      }
      else if (props.whatdelete === "suggestion") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/suggestion/${delId}/delete_suggestion`
        );
        if (delResponse.status === 200) {
          dispatch(deletesuggestion(delId));
          toast.success("suggestion deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete suggestion");
          setloading(false);

        }
      }
      else if (props.whatdelete === "Makkahhotel") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/hotels/delete_Makkah_hotel/${delId}`
        );
        if (delResponse.status === 200) {
          dispatch(deletehotelmakkha(delId));
          toast.success("Makkha hotel deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete Makkha hotel");
          setloading(false);

        }
      }
      else if (props.whatdelete === "Madinahhotel") {

        const delResponse = await axios.delete(
          `${serverUrl}/api/hotels/delete_madina_hotel/${delId}`
        );
        if (delResponse.status === 200) {
          dispatch(deletehotelmadinah(delId));
          toast.success("Madinah hotel deleted successfully");
          setloading(false);
        } else {
          toast.error("Failed to delete Madinah hotel");
          setloading(false);

        }
      }
      setshowModal(false)
    } catch (error) {
      setshowModal(false)

      setloading(false);
      toast.error(error.response.data.message)
    }
  };


  return (
    <>

      {props.showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center enter:ease-out duration-300">
          <div className="bg-white border rounded-lg shadow max-w-sm">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={() => setshowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 pt-0 text-center">
              <svg
                className="w-20 h-20 text-red-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                Are you sure you want to delete this {props.whatdelete}? This action can't be
                Undo.
              </h3>
              <button
                onClick={handleDeleteClick}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setshowModal(false)}
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
