import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
// import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { AddNewmiqat } from "../../../StoreRedux/miqatSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useNavigate } from "react-router-dom";
const serverUrl = process.env.REACT_APP_Server_Url

const AddMiqats = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const miqatintial = {
    miqatName: "", latitude: 0, longitude: 0, miqatDescription: "", distanceFromMakkah: "", directionRelativeToMakkah: "", distanceFromMadinah: "", directionRelativeToMadinah: "", Image1: "", Image2: "", Image3: "", video: ""
  }
  const miqaterror = {
    miqatName: "", latitude: "", longitude: "", distanceFromMakkah: "", directionRelativeToMakkah: "", Image1: ""
  }
  const [error, setError] = useState(miqaterror);
  const [addmiqat, setmiqat] = useState(miqatintial);
  const [loading, setloading] = useState(false);

  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prevError) => ({ ...prevError, [name]: `Required` }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }

    setmiqat((pre) => ({ ...pre, [name]: value }))
  }
  // useEffect(() => {
  //   if (addmiqat.miqatOrigin === "Makkah" && (addmiqat.latitude !== 21.422645025412407 || addmiqat.longitude !== 39.82630859064853)) {
  //     setmiqat((pre) => ({ ...pre, latitude: 21.422645025412407, longitude: 39.82630859064853 }))
  //   }
  //   if (addmiqat.miqatOrigin === "Madinah" && (addmiqat.latitude !== 24.468154002696597 || addmiqat.longitude !== 39.61252779089257)) {
  //     setmiqat((pre) => ({ ...pre, latitude: 24.468154002696597, longitude: 39.61252779089257 }))
  //   }

  // }, [addmiqat])


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
      // formData.append('miqatName', addmiqat.miqatName);
      // formData.append('miqatDescription', addmiqat.miqatDescription);
      // formData.append('latitude', addmiqat.latitude);
      // formData.append('longitude', addmiqat.longitude);
      // formData.append('directionRelativeToMadinah', addmiqat.directionRelativeToMadinah);
      // formData.append('directionRelativeToMakkah', addmiqat.directionRelativeToMakkah);
      // formData.append('distanceFromMadinah', addmiqat.distanceFromMadinah);
      // formData.append('distanceFromMakkah', addmiqat.distanceFromMakkah);

      // const compressedFile1 = await imageCompression(addmiqat.Image1, options);
      // formData.append('Image1', compressedFile1);

      // if (addmiqat.Image2) {
      //   const compressedFile2 = await imageCompression(addmiqat.Image2, options);
      //   formData.append('Image2', compressedFile2);
      // }
      // if (addmiqat.Image3) {
      //   const compressedFile3 = await imageCompression(addmiqat.Image3, options);
      //   formData.append('Image3', compressedFile3);
      // }
      // if (addmiqat.video) {

      //   formData.append('video', addmiqat.video);
      // }
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
      if (!addmiqat.Image1 || !(addmiqat.Image1 instanceof File)) {
        toast.info("Please Select Image")
        return
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


      const response = await axios.post(`${serverUrl}/api/miqats/add-miqat`, newmiqat, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response && response.status === 200) {
        setloading(false)
        dispatch(AddNewmiqat(response.data.newMiqat))
        toast.success(response.data.message)
        navigate("/Admin/Miqats")
      }
      setmiqat(miqatintial)
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
            Add Miqat
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
              {error.miqatName && <p className="text-red-700 text-sm font-normal">
                {error.miqatName}
              </p>}

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
              {error.distanceFromMakkah && <p className="text-red-700 text-sm font-normal">
                {error.distanceFromMakkah}
              </p>}

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
              {error.directionRelativeToMakkah && <p className="text-red-700 text-sm font-normal">
                {error.directionRelativeToMakkah}
              </p>}

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
                  value={addmiqat.longitude}
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
                required
                onChange={(e) => {
                  setmiqat((pre) => ({ ...pre, Image1: e.target.files[0] }))

                }}
                className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
              {error.Image1 && <p className="text-red-700 text-sm font-normal">
                {error.Image1}
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
                  setmiqat((pre) => ({ ...pre, Image2: e.target.files[0] }))

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
                  setmiqat((pre) => ({ ...pre, Image3: e.target.files[0] }))

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
                  setmiqat((pre) => ({ ...pre, video: e.target.files[0] }))

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
                required
                value={addmiqat.latitude}
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
                required
                type="number"
                value={addmiqat.longitude}
                onChange={handelChangeInput}
                name="longitude"

                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
        <div style={{ height: "400px" }}>
          <MyComponent latitude={addmiqat.latitude} longitude={addmiqat.longitude} setmiqat={setmiqat} />
        </div> */}


      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add miqat
        </button>
      </div>
    </form>
    <Loader loading={loading} />
  </>
  );
};

export default AddMiqats;
