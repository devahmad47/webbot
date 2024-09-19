import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selecttoilets } from '../../../StoreRedux/toiletsSlice'
import { AddNewmtoilets, updatemtoiletss, selectmtoiletss } from "../../../StoreRedux/MtoiletsSlice";


export function ToiletInfo() {
  const StoreAlltoilets = useSelector(selecttoilets)
  const storeAllMtoilets = useSelector(selectmtoiletss)

  const { toiletId , originCity } = useParams()
  const [currenttoilet, setCurrenttoilet] = useState(null)

  useEffect(() => {
    if (originCity === "Makkah") {
      const currenttoilet = StoreAlltoilets.find((toilet) => toilet._id.toString() === toiletId)
      setCurrenttoilet(currenttoilet);
    } else if (originCity === "Madinah") {
      const currenttoilet = storeAllMtoilets.find((toilet) => toilet._id.toString() === toiletId)
      setCurrenttoilet(currenttoilet);
    }
  }, [toiletId, StoreAlltoilets, storeAllMtoilets, originCity]);

 

  console.log(currenttoilet)
  return (
    <>
      <div className="bg-white">

        {
          currenttoilet ? <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <div className='flex items-center justify-between'>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Toilet Details</h2>

              </div>

              <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">

                <div className="border-t col-span-1 sm:col-span-2   border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">toilet Name</dt>
                  <div className=" py-2 ">
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      <span>
                        {currenttoilet.toiletNameEng}
                      </span>
                      {currenttoilet.toiletNameArb &&
                        <span>
                          {currenttoilet.toiletNameArb}
                        </span>
                      }
                    </dd>
                  </div>

                </div>
                {
                  currenttoilet.toiletNumber &&
                  <div className="border-t border-gray-200 py-2 ">
                    <dt className="font-medium text-gray-900">Toilets Number</dt>
                    <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                      {currenttoilet.toiletNumber}
                    </dd>
                  </div>
                }


                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Latitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currenttoilet.latitude}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Longitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currenttoilet.longitude}
                  </dd>
                </div>



              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src={currenttoilet.toiletImage1}
                alt="toilet"
                className="rounded-lg bg-gray-100"
              />
              {
                currenttoilet.toiletImage2 && <img
                  src={currenttoilet.toiletImage2}
                  alt="toilet"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currenttoilet.toiletImage3 && <img
                  src={currenttoilet.toiletImage3}
                  alt="toilet"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currenttoilet.toiletVideo &&
                <video width="640" height="360" controls>
                  <source src={currenttoilet.toiletVideo} type="video/mp4" />
                </video>

              }

            </div>
          </div> :
            <div>
              <p>
                No toilet found
              </p>
            </div>
        }

      </div >
    </>
  )
}

