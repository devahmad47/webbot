import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selecthotelmakkhas } from '../../../StoreRedux/hotelMakkhaSlice'
import { selecthotelmadinahs } from "../../../StoreRedux/hotelMadinahaSlice";


export function HotelInfo() {
  const StoreAllhotels = useSelector(selecthotelmakkhas)
  const storeAllMhotels = useSelector(selecthotelmadinahs)

  const { hotelId, originCity } = useParams()
  const [currenthotel, setCurrenthotel] = useState(null)

  useEffect(() => {
    if (originCity === "Makkah") {
      const currenthotel = StoreAllhotels.find((hotel) => hotel._id.toString() === hotelId)
      setCurrenthotel(currenthotel);
    } else if (originCity === "Madinah") {
      const currenthotel = storeAllMhotels.find((hotel) => hotel._id.toString() === hotelId)
      setCurrenthotel(currenthotel);
    }
  }, [hotelId, StoreAllhotels, storeAllMhotels, originCity]);



  console.log(currenthotel)
  return (
    <>
      <div className="bg-white">

        {
          currenthotel ? <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <div className='flex items-center justify-between'>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">hotel Details</h2>

              </div>

              <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">

                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Name</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currenthotel.name}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Vicinity</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currenthotel.vicinity}
                  </dd>
                </div>
                
                {
                  currenthotel.rating &&
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">hotels Rating</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currenthotel.rating}
                    </dd>
                  </div>
                }


                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Latitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currenthotel.geometry.location.lat}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Longitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currenthotel.geometry.location.lng}
                  </dd>
                </div>



              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src={currenthotel.hotelImage1}
                alt="hotel"
                className="rounded-lg bg-gray-100"
              />
              {
                currenthotel.hotelImage2 && <img
                  src={currenthotel.hotelImage2}
                  alt="hotel"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currenthotel.hotelImage3 && <img
                  src={currenthotel.hotelImage3}
                  alt="hotel"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currenthotel.hotelVideo &&
                <video width="640" height="360" controls>
                  <source src={currenthotel.hotelVideo} type="video/mp4" />
                </video>

              }

            </div>
          </div> :
            <div>
              <p>
                No hotel found
              </p>
            </div>
        }

      </div >
    </>
  )
}

