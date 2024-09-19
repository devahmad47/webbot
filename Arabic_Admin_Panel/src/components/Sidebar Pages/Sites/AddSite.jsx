import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
// import MyComponent from "../map3"
import axios from "axios";
// import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { AddNewsite } from "../../../StoreRedux/siteSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useNavigate } from "react-router-dom";
const serverUrl = process.env.REACT_APP_Server_Url
const AddSite = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const siteintial = {
    siteName: "", siteDescription: "", latitude: 0, longitude: 0, siteImage1: "", siteImage2: "", siteImage3: "", siteVideo: ""
  }
  const Siteerror = {
    siteName: "", siteDescription: "", latitude: 0, longitude: 0, siteImage1: "", siteImage2: "", siteImage3: "", siteVideo: ""
  }
  const [error, setError] = useState(Siteerror);
  const [addSite, setSite] = useState(siteintial);
  const [loading, setloading] = useState(false);

  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prevError) => ({ ...prevError, [name]: `` }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }
    setSite((pre) => ({ ...pre, [name]: value }))
    }
  // useEffect(() => {
  //   if (addSite.doorOrigin === "Makkah" && (addSite.latitude !== 21.422645025412407 || addSite.longitude !== 39.82630859064853)) {
  //     setDoor((pre) => ({ ...pre, latitude: 21.422645025412407, longitude: 39.82630859064853 }))
  //   }
  //   if (addSite.doorOrigin === "Madinah" && (addSite.latitude !== 24.468154002696597 || addSite.longitude !== 39.61252779089257)) {
  //     setDoor((pre) => ({ ...pre, latitude: 24.468154002696597, longitude: 39.61252779089257 }))
  //   }

  // }, [addSite])


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

      // const formData = new FormData();
      // formData.append('doorNameEng', addSite.doorNameEng);
      // formData.append('doorNameArb', addSite.doorNameArb);
      // formData.append('latitude', addSite.latitude);
      // formData.append('longitude', addSite.longitude);
      // formData.append('gateNumber', addSite.gateNumber);
      // formData.append('additionalInfo', addSite.additionalInfo);
      // formData.append('doorOrigin', addSite.doorOrigin);

      // const compressedFile1 = await imageCompression(addSite.Image1, options);
      // formData.append('Image1', compressedFile1);
      setloading(true)
      const newsite = {
        siteName: addSite.siteName,
        siteDescription: addSite.siteDescription,
        latitude: addSite.latitude,
        longitude: addSite.longitude,
      }
      if (!addSite.siteImage1 || !(addSite.siteImage1 instanceof File)) {
        toast.info("Please Select Image")
        return
      }
      setloading(true)

      if (addSite.siteImage1 instanceof File) {
        const compressedFile1 = await imageCompression(addSite.siteImage1, options);
        newsite['siteImage1'] = await uploadtoCloudinary(compressedFile1, "site")
      }
      

      if (addSite.siteImage2 instanceof File) {
        const compressedFile2 = await imageCompression(addSite.siteImage2, options);
        newsite["siteImage2"] = await uploadtoCloudinary(compressedFile2, "site")

      }

      if (addSite.siteImage3  instanceof File) {
        const compressedFile3 = await imageCompression(addSite.siteImage3, options);
        newsite["siteImage3"] = await uploadtoCloudinary(compressedFile3, "site")
      }

      if (addSite.siteVideo  instanceof File) {
        newsite["siteVideo"] = await uploadtoCloudinary(addSite.siteVideo, "site")
      }
      const response = await axios.post(`${serverUrl}/api/sites/add-site`, newsite, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response && response.status === 200) {
        setloading(false)
        dispatch(AddNewsite(response.data.newsite))
        // console.log("add sites====>",response.data.newsite)
        toast.success(response.data.message)
         navigate("/Admin/sites")
      }
      // setSite(siteintial)
    } catch (error) {
      setloading(false)
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }


  return (
  <>
    <form onSubmit={handelFormSubmit} >
      <div className="space-y-12">
        {/* add site */}
        <div >
          <h2 className="text-3xl mt-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add Site
          </h2>
          <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">
            <div className="sm:col-span-1">
              <label
                htmlFor="first-name"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Site name (English) <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  onChange={handelChangeInput}
                  type="text"
                  name="siteName"
                  value={addSite.siteName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.siteName && <p className="text-red-700 text-sm font-normal">
                {error.siteName}
              </p>}

            </div>
            {/* <div className="sm:col-span-1">
              <label
                htmlFor="first-name"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Site name (Arabic)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={addSite.siteNameArb}
                  name="siteNameArb"
                  onChange={handelChangeInput}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.siteNameArb && <p className="text-red-700 text-sm font-normal">
                {error.siteNameArb}
              </p>}
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="numberRange"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Site Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  value={addSite.gateNumber}
                  name="gateNumber"
                  onChange={handelChangeInput}
                  type="text"

                  placeholder="0"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.gateNumber && <p className="text-red-700 text-sm font-normal">
                  {error.gateNumber}
                </p>}
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="category"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Site Origin <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select

                  onChange={handelChangeInput}
                  placeholder="select"
                  name="siteOrigin"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Makkah</option>
                  <option>Madinah</option>
                </select>
              </div>
              {error.siteOrigin && <p className="text-red-700 text-sm font-normal">
                {error.siteOrigin}
              </p>}
            </div> */}
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
                  value={addSite.latitude}
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
                  type="number"
                  value={addSite.longitude}
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

            <div className="col-span-3">
              <label
                htmlFor="siteDescription"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={addSite.siteDescription}
                  name="siteDescription"
                  onChange={handelChangeInput}
                  className="block w-full border-0 rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
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

                onChange={(e) => {
                  setSite((pre) => ({ ...pre, siteImage1: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
              {error.siteImage1 && <p className="text-red-700 text-sm font-normal">
                {error.siteImage1}
              </p>}
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Image 2</h3>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSite((pre) => ({ ...pre, siteImage2: e.target.files[0] }))

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
                  setSite((pre) => ({ ...pre, siteImage3: e.target.files[0] }))

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
                  setSite((pre) => ({ ...pre, siteVideo: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
            </div>
          </div>
        </div>



        {/* Location */}
        {/* <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          Location
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="Latitude"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Latitude
            </label>
            <div className="mt-2">
              <input
                type="number"
                
                value={addSite.latitude}
                onChange={handelChangeInput}
                name="latitude"

                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2 ">
            <label
              htmlFor="Longitude"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Longitude
            </label>
            <div className="mt-2">
              <input
                
                type="number"
                value={addSite.longitude}
                onChange={handelChangeInput}
                name="longitude"

                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
        <div style={{ height: "400px" }}>
          <MyComponent latitude={addSite.latitude} longitude={addSite.longitude} setDoor={setDoor} />
        </div> */}


      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Site
        </button>
      </div>
    </form>
    <Loader loading={loading} />
  </>
  );
};

export default AddSite;
