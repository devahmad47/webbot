import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
// import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddNewhotelmakkha } from "../../../StoreRedux/hotelMakkhaSlice";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useNavigate } from "react-router-dom";
import { AddNewhotelmadinah } from "../../../StoreRedux/hotelMadinahaSlice";
const serverUrl = process.env.REACT_APP_Server_Url


const Addhotels = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hotelintial = {
    latitude: "",
    longitude: "",
    name: "",
    rating: 0,
    vicinity: "",
    Image1: "",
    Image2: "",
    Image3: "",
    video: "",
    hotelOrigin: "Makkha"
    // "place_id": "ChIJt8zKi9vrgz4RYL2J8pEOzhQ",

  }
  const hotelerror = {
    name: "", latitude: "", longitude: "", hotelOrigin: "", rating: "" , vicinity :""
  }
  const [error, setError] = useState(hotelerror);
  const [addhotel, sethotel] = useState(hotelintial);
  const [loading, setloading] = useState(false);

  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prevError) => ({ ...prevError, [name]: `Required` }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }

    sethotel((pre) => ({ ...pre, [name]: value }))
  }
  // useEffect(() => {
  //   if (addhotel.hotelOrigin === "Makkah" && (addhotel.latitude !== 21.422645025412407 || addhotel.longitude !== 39.82630859064853)) {
  //     sethotel((pre) => ({ ...pre, latitude: 21.422645025412407, longitude: 39.82630859064853 }))
  //   }
  //   if (addhotel.hotelOrigin === "Madinah" && (addhotel.latitude !== 24.468154002696597 || addhotel.longitude !== 39.61252779089257)) {
  //     sethotel((pre) => ({ ...pre, latitude: 24.468154002696597, longitude: 39.61252779089257 }))
  //   }

  // }, [addhotel])


  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handelFormSubmit = async (e) => {
    try {
      e.preventDefault()

      const hasErrors = Object.values(error).some((err) => err !== "");
      if (hasErrors) {
        return;
      }
      console.log(addhotel)

      const newhotel = {
        name: addhotel.name,
        rating: addhotel.rating,
        vicinity: addhotel.vicinity,

        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        types: ["lodging", "point_of_interest", "establishment"],

        geometry: {
          location: {
            lat: addhotel.latitude,
            lng: addhotel.longitude
          },
        },

      }
     
      setloading(true)
      if (addhotel.Image1 instanceof File) {
        const compressedFile1 = await imageCompression(addhotel.Image1, options);
        newhotel['hotelImage1'] = await uploadtoCloudinary(compressedFile1, "hotel")
      }

      if (addhotel.Image2 instanceof File) {
        const compressedFile2 = await imageCompression(addhotel.Image2, options);
        newhotel["hotelImage2"] = await uploadtoCloudinary(compressedFile2, "hotel")

      }
      if (addhotel.Image3 instanceof File) {
        const compressedFile3 = await imageCompression(addhotel.Image3, options);
        newhotel["hotelImage3"] = await uploadtoCloudinary(compressedFile3, "hotel")
      }
      if (addhotel.video instanceof File) {
        newhotel["hotelVideo"] = await uploadtoCloudinary(addhotel.video, "hotel")
      }
      console.log(newhotel)

      let origin = "makkah"
      if (addhotel.hotelOrigin === "Madinah") {
        origin = "madina"
      }

      console.log(newhotel)
      const response = await axios.post(`${serverUrl}/api/hotels/add_${origin}_hotel`, newhotel, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response && response.status === 200) {
        setloading(false)

        if (addhotel.hotelOrigin === "Madinah") {
          dispatch(AddNewhotelmadinah(response.data.hotel))
        } else {

          dispatch(AddNewhotelmakkha(response.data.hotel))
        }
console.log("xdvsdvdsvsdv",response.data.hotel)
        toast.success(response.data.message)
        navigate("/Admin/hotels")
      }
      sethotel(hotelintial)
    } catch (error) {
      setloading(false)
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }


  return (<>
    <form onSubmit={handelFormSubmit} >
      <div className="space-y-12">

        {/* add hotel */}

        <div >
          <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add hotel
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
              {error.name && <p className="text-red-700 text-sm font-normal">
                {error.name}
              </p>}

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
              {error.rating && <p className="text-red-700 text-sm font-normal">
                {error.rating}
              </p>}

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
              {error.vicinity && <p className="text-red-700 text-sm font-normal">
                {error.vicinity}
              </p>}

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
                  value={addhotel.latitude}
                  onChange={handelChangeInput}
                  name="latitude"

                  placeholder="0"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.latitude && <p className="text-red-700 text-sm font-normal">
                  {error.latitude}
                </p>}
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
                  value={addhotel.longitude}
                  onChange={handelChangeInput}
                  name="longitude"

                  placeholder="0"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.longitude && <p className="text-red-700 text-sm font-normal">
                  {error.longitude}
                </p>}
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                hotel Origin <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select

                  onChange={handelChangeInput}
                  placeholder="select"
                  name="hotelOrigin"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Makkah">Makkah</option>
                  <option value="Madinah">Madinah</option>
                </select>
              </div>
              {error.hotelOrigin && <p className="text-red-700 text-sm font-normal">
                {error.hotelOrigin}
              </p>}
            </div>


          </div>
        </div>




        {/* images section */}

        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
          Images
        </h2>
        <div className="max-w-5xl mx-auto my-1">
          <div className="border-l-2 border-gray-500 pl-8">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Image 1 <span className="text-red-500">*</span></h3>
              </div>
              <input
                type="file"
                accept="image/*"
                // required
                onChange={(e) => {
                  sethotel((pre) => ({ ...pre, Image1: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
              {/* {error.Image1 && <p className="text-red-700 text-sm font-normal">
                {error.Image1}
              </p>} */}
            </div>
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



      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add hotel
        </button>
      </div>
    </form>
    <Loader loading={loading} />
  </>
  );
};

export default Addhotels;
