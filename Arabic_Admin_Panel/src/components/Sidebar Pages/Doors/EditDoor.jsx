import React, { useState, useEffect } from "react";
import { Loader } from "../../Loader/loader";
import axios from "axios";
// import { serverUrl } from "../../../config";
import { selectdoors, updatedoors, } from "../../../StoreRedux/doorSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';
import { useParams } from "react-router-dom";
import { uploadtoCloudinary, } from "../../../uploadFiletoCloudinary";
const serverUrl = process.env.REACT_APP_Server_Url



const Editdoor = () => {
  const { doorId } = useParams()
  const dispatch = useDispatch();
  const storeAllDoors = useSelector(selectdoors)
  const [addDoor, setDoor] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const currentDoor = storeAllDoors.find((door) => door._id === doorId)
    console.log(currentDoor)
    setDoor(currentDoor);
  }, [doorId, storeAllDoors]);
  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    setDoor((pre) => ({ ...pre, [name]: value }))
  }
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const handelDelete = async (name, url, doorId) => {
    try {
      setloading(true)
      const response = await axios.post(`${serverUrl}/api/doors/delete_file_cloudinary`, { name, fileUrl: url, doorId }); // Changed the URL endpoint for image uploads
      if (response.status === 200) {
        setloading(false)
        dispatch(updatedoors(response.data.existingDoor));
        toast.success("deleted Successfully")
      }

    } catch (error) {
      setloading(false)
      console.error('Error delete image:', error);
      console.log(error.response.data.message)
      toast.error("failed to delete")
      // throw error; // Throw the error to propagate it to the calling code
    }
  }
  const handelFormSubmit = async (e) => {
    try {
      e.preventDefault()

      // const formData = new FormData();
      // formData.append('doorNameEng', addDoor.doorNameEng);
      // formData.append('doorNameArb', addDoor.doorNameArb);
      // formData.append('latitude', addDoor.latitude);
      // formData.append('longitude', addDoor.longitude);
      // formData.append('gateNumber', addDoor.gateNumber);
      // formData.append('additionalInfo', addDoor.additionalInfo);
      // formData.append('doorOrigin', addDoor.doorOrigin);
      const newdoor = {
        doorNameEng: addDoor.doorNameEng,
        doorNameArb: addDoor.doorNameArb,
        latitude: addDoor.latitude,
        longitude: addDoor.longitude,
        gateNumber: addDoor.gateNumber,
        doorOrigin: addDoor.doorOrigin,
        additionalInfo: addDoor.additionalInfo,

      }
      setloading(true)

      if (addDoor.Image1 instanceof File) {
        const compressedFile1 = await imageCompression(addDoor.Image1, options);
        newdoor['doorImage1'] = await uploadtoCloudinary(compressedFile1, "doors")
      }
      if (addDoor.Image2 instanceof File) {
        const compressedFile2 = await imageCompression(addDoor.Image2, options);
        newdoor["doorImage2"] = await uploadtoCloudinary(compressedFile2, "doors")

      }

      if (addDoor.Image3 instanceof File) {
        const compressedFile3 = await imageCompression(addDoor.Image3, options);
        newdoor["doorImage3"] = await uploadtoCloudinary(compressedFile3, "doors")
      }

      if (addDoor.video instanceof File) {
        newdoor["doorVideo"] = await uploadtoCloudinary(addDoor.video, "doors")
      }

      const response = await axios.put(`${serverUrl}/api/doors/${doorId}/edit-door`, newdoor, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response && response.status === 200) {
        setloading(false)
        // console.log(response.data.updatedDoor)
        dispatch(updatedoors(response.data.updatedDoor))
        toast.success(response.data.message)
      }
      // setDoor(doorintial)
    } catch (error) {
      setloading(false)
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("failed to update Door")
      }
    }
  }

  return (
    <>

      {addDoor &&
        <form onSubmit={handelFormSubmit} >
          <div className="space-y-12">

            {/* add hotel */}

            <div >
              <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Update Door
              </h2>

              <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">

                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Door name (English) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}
                      required
                      type="text"
                      name="doorNameEng"
                      value={addDoor.doorNameEng}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Door name (Arabic)
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={addDoor.doorNameArb}
                      name="doorNameArb"
                      onChange={handelChangeInput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="numberRange"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Door Number <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      value={addDoor.gateNumber}
                      name="gateNumber"
                      onChange={handelChangeInput}
                      type="text"

                      placeholder="0"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Door Origin <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      onChange={handelChangeInput}
                      placeholder="select"
                      name="doorOrigin"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Makkah</option>
                      <option>Madinah</option>
                    </select>
                  </div>

                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="numberRange"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      required
                      value={addDoor.latitude}
                      onChange={handelChangeInput}
                      name="latitude"

                      placeholder="0"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="numberRange"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="number"
                      value={addDoor.longitude}
                      onChange={handelChangeInput}
                      name="longitude"

                      placeholder="0"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={addDoor.additionalInfo}
                      name="additionalInfo"
                      onChange={handelChangeInput}
                      className="block w-full border-0 rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
              Images
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3   gap-4 sm:gap-6 lg:gap-8">

              <div className="  mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Replace Image 1 </h3>

              </div>

              <div>
                <input
                  type="file"
                  accept="image/*"

                  onChange={(e) => {
                    setDoor((pre) => ({ ...pre, Image1: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
              <div className="relative  ">
                {
                  addDoor.doorImage1 && <>

                    <img
                      src={addDoor.doorImage1}
                      alt="door"
                      className="rounded-lg bg-gray-100"
                    />
                    <div onClick={() => { handelDelete("doorImage1", addDoor.doorImage1, addDoor._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </div>
                  </>}
              </div>

              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Image 2</h3>

              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setDoor((pre) => ({ ...pre, Image2: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />

              <div className="relative">
                {
                  addDoor.doorImage2 && <>

                    <img
                      src={addDoor.doorImage2}
                      alt="door"
                      className="rounded-lg bg-gray-100"
                    />
                    <div onClick={() => { handelDelete("doorImage2", addDoor.doorImage2, addDoor._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </div>
                  </>}
              </div>


              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Image 3</h3>

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setDoor((pre) => ({ ...pre, Image3: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />

              <div className="relative">
                {
                  addDoor.doorImage3 && <>

                    <img
                      src={addDoor.doorImage3}
                      alt="door"
                      className="rounded-lg bg-gray-100"
                    />
                    <div onClick={() => { handelDelete("doorImage3", addDoor.doorImage3, addDoor._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </div>

                  </>}
              </div>

              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Video</h3>
              </div>
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => {
                  setDoor((pre) => ({ ...pre, video: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
              <div className="relative">
                {
                  addDoor.doorVideo && <>

                    <video width="640" height="360" controls>
                      <source src={addDoor.doorVideo} type="video/mp4" />
                    </video>
                    <div onClick={async () => {
                      await handelDelete("doorVideo", addDoor.doorVideo, addDoor._id.toString())
                    }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </div>
                  </>}
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Door
            </button>
          </div>
        </form >
      }

      <Loader loading={loading} />
    </>
  );
};

export default Editdoor;






