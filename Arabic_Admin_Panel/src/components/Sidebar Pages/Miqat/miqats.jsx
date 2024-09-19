import { useState } from "react";
import { Loader } from "../../Loader/loader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteModal from "../../DeleteModal";
import { selectmiqats } from "../../../StoreRedux/miqatSlice";
import { openGoogleMaps, saveMiqatsToJSON } from "../createJson/createJson";


export const Miqats = () => {
  const [delId, setdelId] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const storeAllmiqats = useSelector(selectmiqats);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate()
  console.log(storeAllmiqats)

  return (
    <>
      <div>

        <div >

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2  w-full">
              {storeAllmiqats && storeAllmiqats.length > 0 && <span className="font-bold"> {storeAllmiqats.length}</span>}
              <span className="font-bold text-2xl text-left w-full  text-purple-700">All Miqats</span>
            </div>
            {/* <h2 className="mr-3 font-bold text-2xl text-center mb-4 text-purple-700">All miqats</h2> */}
            {storeAllmiqats && storeAllmiqats.length > 0 &&
              <div className="text-right w-full flex items-center justify-end">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="font-semibold text-green-600">
                    Download Record (json)
                  </h2>
                  <div className="cursor-pointer" onClick={() => {
                    saveMiqatsToJSON(storeAllmiqats, "miqats")
                  }}>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="grid grid-cols-5 md:grid-cols-6 bg-gray-50 text-center  my-4 p-2">
            <h2 className="px-6 col-span-1   text-md font-bold  tracking-wider" >
              Miqat Name
            </h2>
            <h2 className="px-2 col-span-1   text-md font-bold "  >
              Distance From Makkah
            </h2>
            <h2 className="px-2 col-span-1   text-md font-bold "  >
              Distance From Madinah
            </h2>
            <h2 className="px-2 col-span-1 md:block hidden text-md font-bold  ">
              Location
            </h2>

            <h2 className="px-2 col-span-1   text-md font-bold  ">
              Actions
            </h2>
            <h2 className="px-2 col-span-1   text-md font-bold  ">
              Map
            </h2>

          </div>
        </div>
        {storeAllmiqats && storeAllmiqats.length > 0 ?

          storeAllmiqats.map((miqat, index) => {
            return <div key={index} className="px-8  py-4 shadow-lg border border-t-2 my-2 rounded-md grid grid-cols-5 md:grid-cols-6 text-center">
              <Link to={`/Admin/MiqatInfo/${miqat._id}`} className="underline text-blue-500 text-sm px-2 font-medium col-span-1 row-span-2 flex items-center justify-between ">
                <span>
                  {miqat.miqatName}
                </span>
              </Link>
              <div className="text-sm  row-span-2 px-2 font-medium col-span-1   text-gray-900">
                {miqat.distanceFromMakkah} km  to {miqat.directionRelativeToMakkah}

              </div>
              <div className="text-sm row-span-2 px-2 font-medium col-span-1   text-gray-900">
                {miqat.distanceFromMadinah ? miqat.distanceFromMadinah : "null"} km  to {miqat.directionRelativeToMadinah ? miqat.directionRelativeToMadinah : "null"}

              </div>

              <div className="text-sm px-2 font-medium col-span-1  md:block hidden text-gray-900">
                {miqat.latitude}
              </div>



              <div className="text-sm  font-medium col-span-1 flex items-center justify-center gap-2 text-gray-900">
                {/* edit */}
                <button
                  onClick={() => {
                    naviagte(`/Admin/Editmiqat/${miqat._id}`)
                  }}
                  className="ml-2 text-2xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </button>
                {/* delete */}
                <button

                  onClick={() => {
                    setshowModal(true);
                    setdelId(miqat._id);

                  }}
                  className="ml-2 text-red-600 hover:text-red-900 text-2xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </div>

              <div className="col-span-1  text-center flex justify-center ">
                <button onClick={() => {
                  openGoogleMaps(miqat.latitude, miqat.longitude)

                }} className='flex items-center justify-center text-blue-600 font-bold'>
                  Map
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>

                </button>
              </div>
              <div className="text-sm px-2 font-medium col-span-1  md:block hidden  text-gray-900">
                {miqat.longitude}
              </div>

            </div>
          })

          : (
            <div >
              <p className="p-2  text-center font-semibold text-lg text-green-700">
                No miqat found
              </p>
            </div >
          )

        }
      </div >


      <Loader loading={loading} />
      <DeleteModal
        setloading={setLoading}
        showModal={showModal}
        setshowModal={setshowModal}
        delId={delId}
        whatdelete="miqat"
      />
    </>
  );
};


