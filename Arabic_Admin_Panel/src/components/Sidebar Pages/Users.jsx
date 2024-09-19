import React, { useEffect, useState } from "react";
import { saveMiqatsToJSON } from "./createJson/createJson";

import { selectUsers, updateUserStatus } from "../../StoreRedux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader/loader";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
// import { serverUrl } from "../../config";
import axios from "axios";
const serverUrl = process.env.REACT_APP_Server_Url


const Users = (props) => {
  const [myusers, setmyusers] = useState([]);
  const [delId, setdelId] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const storeAllUsers = useSelector(selectUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    setmyusers(storeAllUsers);
  }, [storeAllUsers, dispatch]);

  const handleChange = async (status, id) => {
    let changestatus = false;
    if (status === true) {
      changestatus = false;
    }
    else {
      changestatus = true;
    }
    try {
      setLoading(true)
      const response = await axios.post(`${serverUrl}/api/users/${id}/update_user_status`, {
        status: changestatus
      })
      console.log(response.data.user);
      if (response && response.status === 200) {
        setLoading(false)

        dispatch(updateUserStatus(response.data.user))
        toast.success(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      if (error.response.status === 401) {
        toast.error(error.response.message);
      } else if (error.response.status === 400) {
        toast.error(error.response.message);
      } else if (error.response.status === 500) {
        toast.error(error.response.message);

      } else {
        toast.error("Failed to Update user status")
      }

    }
  }
  return (
    <>
      <div className="min-w-full overflow-x-auto">
        {storeAllUsers && storeAllUsers.length > 0 &&
          <div className="text-right w-full flex items-center justify-end">
            <div className="flex items-center justify-center gap-2">
              <h2 className="font-semibold text-green-600">
                Download Record (json)
              </h2>
              <div className="cursor-pointer" onClick={() => {
                saveMiqatsToJSON(storeAllUsers, "users")
              }}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
            </div>
          </div>
        }
        <h2 className="mr-3 font-bold text-2xl text-center mb-4 text-purple-700">All Users</h2>

        <div className="grid grid-cols-6 bg-gray-50 text-center ">
          <h2 className="px-6 col-span-1 py-3  text-md font-bold  uppercase tracking-wider"            >
            Name
          </h2>
          <h2 className="px-6 col-span-2 py-3  text-md font-bold  uppercase tracking-wider"            >
            Email
          </h2>
          <h2 className="px-6 col-span-1 py-3 text-md font-bold  uppercase tracking-wider"            >
            Update Status
          </h2>
          <h2 className="px-6 col-span-1 py-3  text-md font-bold  uppercase tracking-wider"            >
            Status

          </h2>
          <h2 className="px-6 col-span-1 py-3  text-md font-bold  uppercase tracking-wider"            >
            Actions
          </h2>

        </div>
        <div className="bg-white divide-y my-2  divide-gray-200">
          {myusers &&
            myusers.length > 0 ?
            myusers.map((use, index) => (
              <div key={index} className="px-6 py-4 grid grid-cols-6 text-center">
                <div className="text-sm font-medium col-span-1  text-gray-900">
                  {use.userName}
                </div>
                <div className="text-sm font-medium col-span-2 1  text-gray-900">
                  {use.email}
                </div>
                <div className="text-sm font-medium col-span-1 1  text-gray-900">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchChecked"
                    onChange={() => {
                      handleChange(use.status, use._id)
                    }}
                    checked={use.status}
                  />
                </div>
                <div className="text-sm font-medium col-span-1 text-gray-900">
                  {use.status === true ? (
                    <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-900">
                      Active
                    </span>
                  ) : (
                    <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-green-900">
                      Suspended
                    </span>
                  )}
                </div>
                <div className="text-sm font-medium col-span-1 text-gray-900">
                  <button
                    // onClick={async () => {
                    //   await handleDeleteClick(use._id);
                    // }}
                    onClick={() => {
                      setshowModal(true);
                      setdelId(use._id);

                    }}
                    className="ml-2 text-red-600 hover:text-red-900 text-2xl"
                  >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </div>

              </div>

            )) :
            (
              <div >
                <p className="p-2 font-semibold">
                  No user found
                </p>
              </div>
            )

          }
        </div>
      </div>
      <Loader loading={loading} />
      <DeleteModal
        setloading={setLoading}
        showModal={showModal}
        setshowModal={setshowModal}
        delId={delId}
        whatdelete="user"
      />
    </>
  );
};

export default Users;
