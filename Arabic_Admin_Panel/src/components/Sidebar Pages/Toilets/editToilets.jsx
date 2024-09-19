import React, { useState, useEffect } from "react";
import { Loader } from "../../Loader/loader";
import axios from "axios";
// import { serverUrl } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';
import { useParams } from "react-router-dom";
import { updatetoilets, selecttoilets } from "../../../StoreRedux/toiletsSlice";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { updatemtoiletss, selectmtoiletss } from "../../../StoreRedux/MtoiletsSlice";
const serverUrl = process.env.REACT_APP_Server_Url

const Edittoilet = () => {
  const { toiletId, originCity } = useParams()
  const dispatch = useDispatch();
  const storeAlltoilets = useSelector(selecttoilets)
  const storeAllMtoilets = useSelector(selectmtoiletss)
  const [addtoilet, settoilet] = useState(null);
  const [loading, setloading] = useState(false);

  console.log(storeAllMtoilets)
  useEffect(() => {
    if (originCity === "Makkah") {
      const currenttoilet = storeAlltoilets.find((toilet) => toilet._id.toString() === toiletId)
      settoilet(currenttoilet);
    } else if (originCity === "Madinah") {
      const currenttoilet = storeAllMtoilets.find((toilet) => toilet._id.toString() === toiletId)
      settoilet(currenttoilet);
    }
  }, [toiletId, storeAlltoilets, storeAllMtoilets, originCity]);

console.log(addtoilet)
  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    settoilet((pre) => ({ ...pre, [name]: value }))
  }
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handelDelete = async (name, url, toiletId) => {
    try {
      setloading(true)

      let origin = "toilets"
      if (originCity === "Madinah") {
        origin = "toiletsMadina"
      }
      const response = await axios.post(`${serverUrl}/api/${origin}/delete_file_cloudinary`, { name, fileUrl: url, toiletId }); // Changed the URL endpoint for image uploads
      console.log(response.data)
      if (response.status === 200) {
        setloading(false)
        if (originCity === "Madinah") {
          console.log(response.data.existingtoilet)
          dispatch(updatemtoiletss(response.data.existingtoilet))
        } else {
          console.log(response.data.existingtoilet)
          dispatch(updatetoilets(response.data.existingtoilet));
        }
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



      const newtoilet = {
        toiletNameEng: addtoilet.toiletNameEng,
        toiletNameArb: addtoilet.toiletNameArb,
        toiletNumber: addtoilet.toiletNumber,
        longitude: addtoilet.longitude,
        latitude: addtoilet.latitude,

      }


      setloading(true)

      if (addtoilet.Image1 instanceof File) {
        const compressedFile1 = await imageCompression(addtoilet.Image1, options);
        newtoilet['toiletImage1'] = await uploadtoCloudinary(compressedFile1, "toilet")
 
      }

      if (addtoilet.Image2 instanceof File) {
        const compressedFile2 = await imageCompression(addtoilet.Image2, options);
        newtoilet["toiletImage2"] = await uploadtoCloudinary(compressedFile2, "toilet")

      }

      if (addtoilet.Image3 instanceof File) {
        const compressedFile3 = await imageCompression(addtoilet.Image3, options);
        newtoilet["toiletImage3"] = await uploadtoCloudinary(compressedFile3, "toilet")
      }

      if (addtoilet.video instanceof File) {
        newtoilet["toiletVideo"] = await uploadtoCloudinary(addtoilet.video, "toilet")
      }


      let origin = "toilets"
      if (originCity === "Madinah") {
        origin = "toiletsMadina"
      }
      console.log(newtoilet)
      const response = await axios.put(`${serverUrl}/api/${origin}/${toiletId}/edit-toilet`, newtoilet, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response && response.status === 200) {
        setloading(false)
        // console.log(response.data.updatedtoilet)
        if (originCity === "Madinah") {
          dispatch(updatemtoiletss(response.data.updatedtoilet))
        } else {

          dispatch(updatetoilets(response.data.updatedtoilet))
        }
        toast.success(response.data.message)
      }

      // settoilet(toiletintial)
    } catch (error) {
      setloading(false)
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("failed to update toilet")
      }
    }
  }

  return (
    <>

      {addtoilet &&
        <form onSubmit={handelFormSubmit} >
          <div className="space-y-12">

            {/* add hotel */}

            <div >
              <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Update toilet
              </h2>

              <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">

                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Toilet Name (Eng)<span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}
                      required
                      type="text"
                      name="toiletNameEng"
                      value={addtoilet.toiletNameEng}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Toilet Name (Arb)
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}

                      type="text"
                      name="toiletNameArb"
                      value={addtoilet.toiletNameArb}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Toilet Number
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}

                      type="text"
                      name="toiletNumber"
                      value={addtoilet.toiletNumber}
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
                      value={addtoilet.latitude}
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
                      value={addtoilet.longitude}
                      onChange={handelChangeInput}
                      name="longitude"

                      placeholder="0"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                  </div>
                </div>


              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
              Images
            </h2>

            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              {
                addtoilet.toiletImage1 &&

                <div className="relative">

                  <img
                    src={addtoilet.toiletImage1}
                    alt="toilet"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("toiletImage1", addtoilet.toiletImage1, addtoilet._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </div>
                </div>
              }
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Replace Image 1 <span className="text-red-500">*</span></h3>
                </div>
                <input
                  type="file"
                  accept="image/*"

                  onChange={(e) => {
                    settoilet((pre) => ({ ...pre, Image1: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />

              </div>
              {
                addtoilet.toiletImage2 &&
                <div className="relative"> 
                  <img
                    src={addtoilet.toiletImage2}
                    alt="toilet"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("toiletImage2", addtoilet.toiletImage2, addtoilet._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    settoilet((pre) => ({ ...pre, Image2: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>

              {
                addtoilet.toiletImage3 && <div className="relative">

                  <img
                    src={addtoilet.toiletImage3}
                    alt="toilet"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("toiletImage3", addtoilet.toiletImage3, addtoilet._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    settoilet((pre) => ({ ...pre, Image3: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
              {
                addtoilet.toiletVideo &&
                <div className="relative">

                  <video width="640" height="360" controls>
                    <source src={addtoilet.toiletVideo} type="video/mp4" />
                  </video>
                  <div onClick={() => { handelDelete("toiletVideo", addtoilet.toiletVideo, addtoilet._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    settoilet((pre) => ({ ...pre, video: e.target.files[0] }))

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
              Update toilet
            </button>
          </div>
        </form>
      }

      <Loader loading={loading} />
    </>
  );
};

export default Edittoilet;






