import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectsites } from '../../../StoreRedux/siteSlice'
import { useSelector } from 'react-redux'
export function SiteInfo() {
  const StoreAllSites = useSelector(selectsites)
  const { siteId } = useParams()
  const [currentSite, setCurrentSite] = useState(null)
  useEffect(() => {
    if (siteId && StoreAllSites && StoreAllSites.length > 0) {
      const thissite = StoreAllSites.find((site) => site._id === siteId)
      setCurrentSite(thissite)
    }
  }, [siteId, StoreAllSites])

  return (
    <>
      <div className="bg-white">

        {
          currentSite ? <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <div className='flex items-center justify-between'>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Site Details</h2>

              </div>
              {
                currentSite.siteDescription &&
                <p className="mt-4 text-gray-500">
                  {
                    currentSite.siteDescription
                  }
                </p>
              }
              <dl className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-x-2 gap-y-4 sm:gap-y-10 lg:gap-x-4">
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Site Name</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    <span>
                      {currentSite.siteName}
                    </span>
                  </dd>
                </div>

                {/* <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">siteImage Number</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentSite.gateNumber}
                  </dd>
                </div> */}
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Latitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentSite.latitude}
                  </dd>
                </div>
                <div className="border-t border-gray-200 py-2 ">
                  <dt className="font-medium text-gray-900">Longitude</dt>
                  <dd className="py-2 text-sm flex items-center justify-between gap-2 text-gray-500">
                    {currentSite.longitude}
                  </dd>
                </div>


              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              {currentSite.siteImage1 &&
                <img
                  src={currentSite.siteImage1}
                  alt="siteImage"
                  className="rounded-lg bg-gray-100"
                />}
              {
                currentSite.siteImage2 && <img
                  src={currentSite.siteImage2}
                  alt="siteImage"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currentSite.siteImage3 && <img
                  src={currentSite.siteImage3}
                  alt="siteImage"
                  className="rounded-lg bg-gray-100"
                />
              }
              {
                currentSite.siteVideo &&
                <video width="640" height="360" controls>
                  <source src={currentSite.siteVideo} type="video/mp4" />
                </video>

              }
            </div>
          </div> :
            <div>
              <p>
                No site found
              </p>
            </div>
        }

      </div >
    </>
  )
}

