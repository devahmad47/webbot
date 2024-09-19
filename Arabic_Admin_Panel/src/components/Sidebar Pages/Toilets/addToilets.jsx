import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
// import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddNewtoilet } from "../../../StoreRedux/toiletsSlice";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useNavigate } from "react-router-dom";
import { AddNewmtoilets } from "../../../StoreRedux/MtoiletsSlice";
const serverUrl = process.env.REACT_APP_Server_Url


const Addtoilets = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toiletintial = {
    toiletNameEng: "", latitude: 0, longitude: 0, toiletNameArb: "", toiletNumber: "", Image1: "", Image2: "", Image3: "", video: "", toiletOrigin: "Makkha"
  }
  const toileterror = {
    toiletNameEng: "", latitude: "", longitude: "", toiletOrigin: ""
  }
  const [error, setError] = useState(toileterror);
  const [addtoilet, settoilet] = useState(toiletintial);
  const [loading, setloading] = useState(false);

  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prevError) => ({ ...prevError, [name]: `Required` }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }

    settoilet((pre) => ({ ...pre, [name]: value }))
  }
  // useEffect(() => {
  //   if (addtoilet.toiletOrigin === "Makkah" && (addtoilet.latitude !== 21.422645025412407 || addtoilet.longitude !== 39.82630859064853)) {
  //     settoilet((pre) => ({ ...pre, latitude: 21.422645025412407, longitude: 39.82630859064853 }))
  //   }
  //   if (addtoilet.toiletOrigin === "Madinah" && (addtoilet.latitude !== 24.468154002696597 || addtoilet.longitude !== 39.61252779089257)) {
  //     settoilet((pre) => ({ ...pre, latitude: 24.468154002696597, longitude: 39.61252779089257 }))
  //   }

  // }, [addtoilet])


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
      console.log(addtoilet)
      // const formData = new FormData();
      // formData.append('toiletNameEng', addtoilet.toiletNameEng);
      // formData.append('toiletNameArb', addtoilet.toiletNameArb);
      // formData.append('latitude', addtoilet.latitude);
      // formData.append('longitude', addtoilet.longitude);
      // formData.append('toiletNumber', addtoilet.toiletNumber);

      // if (addtoilet.Image1) {

      //   const compressedFile1 = await imageCompression(addtoilet.Image1, options);
      //   formData.append('Image1', compressedFile1);
      // }

      // if (addtoilet.Image2) {
      //   const compressedFile2 = await imageCompression(addtoilet.Image2, options);
      //   formData.append('Image2', compressedFile2);
      // }
      // if (addtoilet.Image3) {
      //   const compressedFile3 = await imageCompression(addtoilet.Image3, options);
      //   formData.append('Image3', compressedFile3);
      // }
      // if (addtoilet.video) {

      //   formData.append('video', addtoilet.video);
      // }
      const newtoilet = {
        toiletNameEng: addtoilet.toiletNameEng,
        toiletNameArb: addtoilet.toiletNameArb,
        latitude: addtoilet.latitude,
        longitude: addtoilet.longitude,
        toiletNumber: addtoilet.toiletNumber,


      }
      if (!addtoilet.Image1 || !(addtoilet.Image1 instanceof File)) {
        toast.info("Please Select Image")
        return
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
      console.log(newtoilet)

      let origin = "toilets"
      if (addtoilet.toiletOrigin === "Madinah") {
        origin = "toiletsMadina"
      }

      const response = await axios.post(`${serverUrl}/api/${origin}/add-toilet`, newtoilet, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response && response.status === 200) {
        setloading(false)
        
          if (addtoilet.toiletOrigin === "Madinah") {
            dispatch(AddNewmtoilets(response.data.newtoilet))
          }else{

            dispatch(AddNewtoilet(response.data.newtoilet))
          }
        
        toast.success(response.data.message)
        navigate("/Admin/Toilets")
      }
      settoilet(toiletintial)
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
            Add toilet
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
              {error.toiletNameEng && <p className="text-red-700 text-sm font-normal">
                {error.toiletNameEng}
              </p>}

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
                  value={addtoilet.longitude}
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
                Toilet Origin <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select

                  onChange={handelChangeInput}
                  placeholder="select"
                  name="toiletOrigin"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Makkah">Makkah</option>
                  <option value="Madinah">Madinah</option>
                </select>
              </div>
              {error.toiletOrigin && <p className="text-red-700 text-sm font-normal">
                {error.toiletOrigin}
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
                  settoilet((pre) => ({ ...pre, Image1: e.target.files[0] }))

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
                  settoilet((pre) => ({ ...pre, Image2: e.target.files[0] }))

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
                  settoilet((pre) => ({ ...pre, Image3: e.target.files[0] }))

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
                  settoilet((pre) => ({ ...pre, video: e.target.files[0] }))

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
                value={addtoilet.latitude}
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
                value={addtoilet.longitude}
                onChange={handelChangeInput}
                name="longitude"

                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
        <div style={{ height: "400px" }}>
          <MyComponent latitude={addtoilet.latitude} longitude={addtoilet.longitude} settoilet={settoilet} />
        </div> */}


      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md mr-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add toilet
        </button>
      </div>
    </form>
    <Loader loading={loading} />
  </>
  );
};

export default Addtoilets;
