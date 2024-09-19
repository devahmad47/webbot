import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectmakkkhaplaces } from '../../../StoreRedux/makkhaPlacesSlice'
import { selectmadinaplaces } from "../../../StoreRedux/madinaPlacesSlice";
export function PlacesInfo() {
  const storeAllPlaces = useSelector(selectmakkkhaplaces)
  const storeAllMPlaces = useSelector(selectmadinaplaces)
  const { placeId, InfoOrigin } = useParams()
  const [currentPlace, setCurrentPlace] = useState(null)
  useEffect(() => { 
    if (InfoOrigin === "Makkah") {
      const currentPlace = storeAllPlaces.find((place) => place._id.toString() === placeId)
      setCurrentPlace(currentPlace);
    } else if (InfoOrigin === "Madinah") {
      const currentPlace = storeAllMPlaces.find((place) => place._id.toString() === placeId)
      setCurrentPlace(currentPlace);
    }
  }, [placeId, storeAllPlaces, storeAllMPlaces, InfoOrigin]);
  console.log(currentPlace)
  return (
    <>
      <div className="bg-white">
        {
          currentPlace && currentPlace.length>0 ? <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <div className='flex items-center justify-between'>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Places Details</h2>
              </div>
              <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Name</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentPlace.name}
                  </dd>
                </div>
                {/* <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Vicinity</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentPlace.vicinity}
                  </dd>
                </div> */}
                
                {
                  currentPlace.rating &&
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Place Rating</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentPlace.rating}
                    </dd>
                  </div>
                }


                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Latitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentPlace.geometry.location.lat}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Longitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentPlace.geometry.location.lng}
                  </dd>
                </div>



              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src={currentPlace.MImage1}
                alt="hotel"
                className="rounded-lg bg-gray-100"
              />
              {
                currentPlace.MImage2 && <img
                  src={currentPlace.MImage2}
                  alt="hotel"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currentPlace.MImage3 && <img
                  src={currentPlace.MImage3}
                  alt="hotel"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currentPlace.MVideo &&
                <video width="640" height="360" controls>
                  <source src={currentPlace.MVideo} type="video/mp4" />
                </video>

              }

            </div>
          </div> :
            <div>
              <p>
                No Place found
              </p>
            </div>
        }

      </div >
    </>
  )
}

