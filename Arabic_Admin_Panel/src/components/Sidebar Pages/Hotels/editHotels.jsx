import React, { useState, useEffect } from "react";
import { Loader } from "../../Loader/loader";
import axios from "axios";
// import { serverUrl } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';
import { useParams } from "react-router-dom";
import { updatehotelmakkhas, selecthotelmakkhas } from "../../../StoreRedux/hotelMakkhaSlice";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { updatehotelmadinahs, selecthotelmadinahs } from "../../../StoreRedux/hotelMadinahaSlice";
const serverUrl = process.env.REACT_APP_Server_Url

const Edithotel = () => {
  const { hotelId, originCity } = useParams()
  const dispatch = useDispatch();
  const storeAllhotels = useSelector(selecthotelmakkhas)
  const storeAllMhotels = useSelector(selecthotelmadinahs)
  const [addhotel, sethotel] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (originCity === "Makkah") {
      const currenthotel = storeAllhotels.find((hotel) => hotel._id.toString() === hotelId)
      sethotel(currenthotel);
    } else if (originCity === "Madinah") {
      const currenthotel = storeAllMhotels.find((hotel) => hotel._id.toString() === hotelId)
      sethotel(currenthotel);
    }
  }, [hotelId, storeAllhotels, storeAllMhotels, originCity]);

  console.log(addhotel)
  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    sethotel((pre) => ({ ...pre, [name]: value }))
  }
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handelDelete = async (name, url, hotelId) => {
    try {
      setloading(true)


      const response = await axios.post(`${serverUrl}/api/hotels/delete_file_cloudinary`, { name, fileUrl: url, hotelId, originCity });
      // Changed the URL endpoint for image uploads
      console.log(response.data)
      if (response.status === 200) {
        setloading(false)
        if (originCity === "Madinah") {
          console.log(response.data.existinghotel)
          dispatch(updatehotelmadinahs(response.data.existinghotel))
        } else {
          console.log(response.data.existinghotel)
          dispatch(updatehotelmakkhas(response.data.existinghotel));
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


      
      console.log(addhotel)
      
      setloading(true)

      if (addhotel.Image1 instanceof File) {
        const compressedFile1 = await imageCompression(addhotel.Image1, options);
        addhotel['hotelImage1'] = await uploadtoCloudinary(compressedFile1, "hotel")

      }

      if (addhotel.Image2 instanceof File) {
        const compressedFile2 = await imageCompression(addhotel.Image2, options);
        addhotel["hotelImage2"] = await uploadtoCloudinary(compressedFile2, "hotel")

      }

      if (addhotel.Image3 instanceof File) {
        const compressedFile3 = await imageCompression(addhotel.Image3, options);
        addhotel["hotelImage3"] = await uploadtoCloudinary(compressedFile3, "hotel")
      }

      if (addhotel.video instanceof File) {
        addhotel["hotelVideo"] = await uploadtoCloudinary(addhotel.video, "hotel")
      }


      let origin = "makkah"
      if (originCity === "Madinah") {
        origin = "madina"
      }
      console.log(addhotel)
      
      const response = await axios.put(`${serverUrl}/api/hotels/edit_${origin}_hotel/${hotelId}`, addhotel, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response && response.status === 200) {
        setloading(false)
        // console.log(response.data.updatedhotel)
        if (originCity === "Madinah") {
          dispatch(updatehotelmadinahs(response.data.hotel))
        } else {

          dispatch(updatehotelmakkhas(response.data.hotel))
        }
        toast.success(response.data.message)
      }

      // sethotel(hotelintial)
    } catch (error) {
      setloading(false)
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error("failed to update hotel")
      }
    }
  }

  return (
    <>

      {addhotel &&
        <form onSubmit={handelFormSubmit} >
          <div className="space-y-12">

            {/* add hotel */}

            <div >
              <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Update hotel
              </h2>

              <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">

                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    hotel Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}
                      required
                      type="text"
                      name="name"
                      value={addhotel.name}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    hotel Rating
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}

                      type="text"
                      name="rating"
                      value={addhotel.rating}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>


                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="first-name"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Vicinity
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handelChangeInput}

                      type="text"
                      name="vicinity"
                      value={addhotel.vicinity}
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
                      value={addhotel.geometry.location.lat}
                      onChange={(e) => {
                        sethotel((pre) => ({ ...pre, geometry: { location: { ...pre.geometry.location, lat: e.target.value } } }))
                      }}

                      name="lat"

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
                      value={addhotel.geometry.location.lng}
                      onChange={(e) => {
                        sethotel((pre) => ({ ...pre, geometry: { location: { ...pre.geometry.location, lng: e.target.value } } }))
                      }}

                      name="lng"

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
                addhotel.hotelImage1 &&

                <div className="relative">

                  <img
                    src={addhotel.hotelImage1}
                    alt="hotel"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("hotelImage1", addhotel.hotelImage1, addhotel._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    sethotel((pre) => ({ ...pre, Image1: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />

              </div>
              {
                addhotel.hotelImage2 &&
                <div className="relative">

                  <img
                    src={addhotel.hotelImage2}
                    alt="hotel"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("hotelImage2", addhotel.hotelImage2, addhotel._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    sethotel((pre) => ({ ...pre, Image2: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>

              {
                addhotel.hotelImage3 && <div className="relative">

                  <img
                    src={addhotel.hotelImage3}
                    alt="hotel"
                    className="rounded-lg bg-gray-100"
                  />
                  <div onClick={() => { handelDelete("hotelImage3", addhotel.hotelImage3, addhotel._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    sethotel((pre) => ({ ...pre, Image3: e.target.files[0] }))

                  }}
                  className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                />
              </div>
              {
                addhotel.hotelVideo &&
                <div className="relative">

                  <video width="640" height="360" controls>
                    <source src={addhotel.hotelVideo} type="video/mp4" />
                  </video>
                  <div onClick={() => { handelDelete("hotelVideo", addhotel.hotelVideo, addhotel._id.toString()) }} className=" text-red-500 cursor-pointer p-2 absolute top-5 right-4">
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
                    sethotel((pre) => ({ ...pre, video: e.target.files[0] }))

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
              Update hotel
            </button>
          </div>
        </form>
      }

      <Loader loading={loading} />
    </>
  );
};

export default Edithotel;






