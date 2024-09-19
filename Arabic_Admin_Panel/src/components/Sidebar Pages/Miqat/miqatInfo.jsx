import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectmiqats } from '../../../StoreRedux/miqatSlice'
import { useSelector } from 'react-redux'


export function MiqatInfo() {
  const StoreAllmiqats = useSelector(selectmiqats)
  const { miqatId } = useParams()
  const [currentmiqat, setCurrentmiqat] = useState(null)

  useEffect(() => {
    if (miqatId && StoreAllmiqats && StoreAllmiqats.length > 0) {
      const thismiqat = StoreAllmiqats.find((miqats) => miqats._id === miqatId)

      setCurrentmiqat(thismiqat)
    }
  }, [miqatId, StoreAllmiqats])

  console.log(currentmiqat)
  return (
    <>
      <div className="bg-white">

        {
          currentmiqat ? <div>

            <div className='flex px-6 items-center justify-between w-full '>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Miqat Details</h2>

            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
              <div>
                {
                  currentmiqat.miqatDescription &&
                  <p className="mt-4 text-gray-500">
                    {
                      currentmiqat.miqatDescription
                    }
                  </p>
                }

                <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">

                  <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Miqat Name</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.miqatName}

                    </dd>
                  </div>

                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Distance From Makkah</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.distanceFromMakkah} km
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Direction Relative To Makkah</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.directionRelativeToMakkah}
                    </dd>
                  </div>

                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Distance From Makkah</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.distanceFromMadinah ? `${currentmiqat.distanceFromMadinah} km` : "null"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Direction Relative To Makkah</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.directionRelativeToMadinah ? currentmiqat.directionRelativeToMadinah : "null"}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Latitude</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.latitude}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Longitude</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currentmiqat.longitude}
                    </dd>
                  </div>



                </dl>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                {
                  currentmiqat.miqatImage1 &&
                  <img
                    src={currentmiqat.miqatImage1}
                    alt="miqat"
                    className="rounded-lg bg-gray-100"
                  />
                }
                {
                  currentmiqat.miqatImage2 && <img
                    src={currentmiqat.miqatImage2}
                    alt="miqat"
                    className="rounded-lg bg-gray-100"
                  />
                }
                {
                  currentmiqat.miqatImage3 && <img
                    src={currentmiqat.miqatImage3}
                    alt="miqat"
                    className="rounded-lg bg-gray-100"
                  />
                }
                {
                  currentmiqat.miqatVideo &&
                  <video width="640" height="360" controls>
                    <source src={currentmiqat.miqatVideo} type="video/mp4" />
                  </video>

                }

              </div>
            </div>
          </div> :
            <div>
              <p>
                No miqat found
              </p>
            </div>

        }

      </div >
    </>
  )
}

