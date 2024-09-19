import React, { useState, useEffect } from "react";
import { Loader } from "../../Loader/loader";
import axios from "axios";
// import { serverUrl } from "../../../config";
import { selectmiqats, updatemiqats } from "../../../StoreRedux/miqatSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useParams } from "react-router-dom";
const serverUrl = process.env.REACT_APP_Server_Url



const Editmiqat = () => {
  const { miqatId } = useParams()
  const dispatch = useDispatch();
  const storeAllmiqats = useSelector(selectmiqats)
  const [addmiqat, setmiqat] = useState(null);
  const [loading, setloading] = useState(false);


  useEffect(() => {
    const currentmiqat = storeAllmiqats.find((miqat) => miqat._id === miqatId)
    console.log(currentmiqat)
    setmiqat(currentmiqat);
  }, [miqatId, storeAllmiqats]);


  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    setmiqat((pre) => ({ ...pre, [name]: value }))
  }
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handelDelete = async (name, url, miqatId) => {
    try {
      setloading(true)
      const response = await axios.post(`${serverUrl}/api/miqats/delete_file_cloudinary`, { name, fileUrl: url, miqatId }); // Changed the URL endpoint for image uploads
      if (response.status === 200) {
        setloading(false)
        dispatch(updatemiqats(response.data.existingmiqat));
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

  
      const newmiqat = {
        miqatName: addmiqat.miqatName,
        miqatDescription: addmiqat.miqatDescription,
        latitude: addmiqat.latitude,
        longitude: addmiqat.longitude,
        directionRelativeToMadinah: addmiqat.directionRelativeToMadinah,
        directionRelativeToMakkah: addmiqat.directionRelativeToMakkah,
        distanceFromMadinah: addmiqat.distanceFromMadinah,
        distanceFromMakkah: addmiqat.distanceFromMakkah,

      }

      setloading(true)


      if (addmiqat.Image1 instanceof File) {
        const compressedFile1 = await imageCompression(addmiqat.Image1, options);
        newmiqat['miqatImage1'] = await uploadtoCloudinary(compressedFile1, "miqat")
      }

      if (addmiqat.Image2 instanceof File) {
        const compressedFile2 = await imageCompression(addmiqat.Image2, options);
        newmiqat["miqatImage2"] = await uploadtoCloudinary(compressedFile2, "miqat")

      }

      if (addmiqat.Image3 instanceof File) {
        const compressedFile3 = await imageCompression(addmiqat.Image3, options);
        newmiqat["miqatImage3"] = await uploadtoCloudinary(compressedFile3, "miqat")
      }

      if (addmiqat.video instanceof File) {
        newmiqat["miqatVideo"] = await uploadtoCloudinary(addmiqat.video, "miqat")
      }





      const response = await axios.put(`${serverUrl}/api/miqats/${miqatId}/edit-miqat`, newmiqat, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response && response.status === 200) {
        setloading(false)
        // console.log(response.data.updatedmiqat)
        dispatch(updatemiqats(response.data.updatedMiqat))
        toast.success(response.data.message)
      }

      // setmiqat(miqatintial)
    } catch (error) {
      setloading(false)
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("failed to update miqat")
      }
    }
  }

  return (
    <>

      {addmiqat &&
        <form onSubmit={handelFormSubmit} >
          <div className="space-y-12">

            {/* add hotel */}

            <div >
              <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Update miqat
              </h2>

              <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">

                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Miqat Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}
                      required
                      type="text"
                      name="miqatName"
                      value={addmiqat.miqatName}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Distance from Makkah (km)<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}
                      required
                      type="text"
                      name="distanceFromMakkah"
                      value={addmiqat.distanceFromMakkah}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Direction relative to Makkha <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}
                      required
                      type="text"
                      name="directionRelativeToMakkah"
                      value={addmiqat.directionRelativeToMakkah}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Distance from Madinah (km)
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}

                      type="text"
                      name="distanceFromMadinah"
                      value={addmiqat.distanceFromMadinah}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Direction relative to Madinah
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}

                      type="text"
                      name="directionRelativeToMadinah"
                      value={addmiqat.directionRelativeToMadinah}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                      value={addmiqat.latitude}
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
                      value={addmiqat.longitude}
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
                      value={addmiqat.miqatDescription}
                      name="miqatDescription"
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

            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">

              <div className="relative">
                {addmiqat.miqatImage1 &&
                  <>
                    <img
                      src={addmiqat.miqatImage1}
                      alt="miqat"
                      className="rounded-lg bg-gray-100"
                    />
                    <div onClick={() => { handelDelete("miqatImage1", addmiqat.miqatImage1, addmiqat._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>

                    </div>
                  </>}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Replace Image 1 <span className="text-red-500">*</span></h3>
                </div>
                <input
                  type="file"
                  accept="image/*"

                  onChange={(e) => {
                    setmiqat((pre) => ({ ...pre, Image1: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />

              </div>
              {
                addmiqat.miqatImage2 &&
                <div className="relative">

                  <img
                    src={addmiqat.miqatImage2}
                    alt="miqat"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("miqatImage2", addmiqat.miqatImage2, addmiqat._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </div>
                </div>

              }
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Image 2</h3>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setmiqat((pre) => ({ ...pre, Image2: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>

              {
                addmiqat.miqatImage3 && <div className="relative">

                  <img
                    src={addmiqat.miqatImage3}
                    alt="miqat"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("miqatImage3", addmiqat.miqatImage3, addmiqat._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </div>
                </div>
              }
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Image 3</h3>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setmiqat((pre) => ({ ...pre, Image3: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
              {
                addmiqat.miqatVideo &&
                <div className="relative">

                  <video width="640" height="360" controls>
                    <source src={addmiqat.miqatVideo} type="video/mp4" />
                  </video>
                  <div onClick={() => { handelDelete("miqatVideo", addmiqat.miqatVideo, addmiqat._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </div>
                </div>


              }
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Video</h3>
                </div>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={(e) => {
                    setmiqat((pre) => ({ ...pre, video: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update miqat
            </button>
          </div>
        </form>
      }

      <Loader loading={loading} />
    </>
  );
};

export default Editmiqat;






