import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectdoors } from '../../../StoreRedux/doorSlice'
import { useSelector } from 'react-redux'



export function DoorInfo() {
  const StoreAlldoors = useSelector(selectdoors)
  const { doorId } = useParams()
  const [currentdoor, setCurrentdoor] = useState(null)

  useEffect(() => {
    if (doorId && StoreAlldoors && StoreAlldoors.length > 0) {
      const thisdoor = StoreAlldoors.find((doors) => doors._id === doorId)
      setCurrentdoor(thisdoor)
    }
  }, [doorId, StoreAlldoors])

  return (
    <>
      <div className="bg-white">

        {
          currentdoor ? <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <div className='flex items-center justify-between'>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Door Details</h2>

              </div>
              {
                currentdoor.additionalInfo &&
                <p className="mt-4 text-gray-500">
                  {
                    currentdoor.additionalInfo
                  }
                </p>
              }

              <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">

                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Door Name</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    <span>
                      {currentdoor.doorNameEng}
                    </span>
                    {currentdoor.doorNameArb &&
                      <span>
                        {currentdoor.doorNameArb}
                      </span>
                    }
                  </dd>
                </div>

                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Door Number</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentdoor.gateNumber}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Latitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentdoor.latitude}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Longitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentdoor.longitude}
                  </dd>
                </div>


              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              {currentdoor.doorImage1 &&
                <img
                  src={currentdoor.doorImage1}
                  alt="door"
                  className="rounded-lg bg-gray-100"
                />}
              {
                currentdoor.doorImage2 && <img
                  src={currentdoor.doorImage2}
                  alt="door"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currentdoor.doorImage3 && <img
                  src={currentdoor.doorImage3}
                  alt="door"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currentdoor.doorVideo &&
                <video width="640" height="360" controls>
                  <source src={currentdoor.doorVideo} type="video/mp4" />
                </video>

              }

            </div>
          </div> :
            <div>
              <p>
                No door found
              </p>
            </div>
        }

      </div >
    </>
  )
}

