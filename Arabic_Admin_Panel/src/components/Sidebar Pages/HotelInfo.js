import React from "react";
import ac from "../assests/ac.png";
import charging from "../assests/charging.png";
import wify from "../assests/wify.png";
import minibar from "../assests/minibar.png";
import parking from "../assests/parking.png";
import pets from "../assests/pets.png";
import pool from "../assests/pool.png";
import smoking from "../assests/smoking.png";
import spas from "../assests/spas.png";
import free from "../assests/free.png";
import breakfast from "../assests/breakfast.png";
import fitness from "../assests/fitness.png";

const RatingStars = ({ stars }) => (
  <div className="flex items-center">
    {Array.from({ length: stars }, (_, index) => (
      <svg
        key={index}
        viewBox="0 -0.03 60.062 60.062"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffdd00"
        style={{
          height: "2em", // Adjust the height for small screens
          maxHeight: "3em", // Set a maximum height for larger screens
        }}
      >
        <path
          d="M670.68,227.733a3.03,3.03,0,0,0,.884,1.072,3.168,3.168,0,0,0,1.282.578l14.662,2.965a3.067,3.067,0,0,1,2.394,2.284,3,3,0,0,1-1.118,3.084l-11.408,8.654a3.01,3.01,0,0,0-.994,1.3,2.956,2.956,0,0,0-.16,1.618L679.3,266.42a3,3,0,0,1-1.275,3.01,3.166,3.166,0,0,1-3.328.146l-13.18-7.407a3.165,3.165,0,0,0-3.091,0l-13.181,7.407a3.156,3.156,0,0,1-3.327-.146,3,3,0,0,1-1.275-3.01l3.078-17.129a2.956,2.956,0,0,0-.16-1.618,3.01,3.01,0,0,0-.994-1.3l-11.408-8.654a3,3,0,0,1-1.118-3.084,3.068,3.068,0,0,1,2.393-2.284l14.66-2.965a3.141,3.141,0,0,0,1.281-.578,3.044,3.044,0,0,0,.885-1.072l7.918-16.013a3.133,3.133,0,0,1,5.587,0Z"
          transform="translate(-629.938 -210)"
        />
      </svg>
    ))}
  </div>
);
const HotelInfo = () => {
  const features = [
    { name: "Hotel Name", description: "AL Fateh" },
    { name: "Location", description: "Faisalabad" },
    { name: "Price Per Hour", description: "$ 20" },
    { name: "Rating", description: "", stars: 5 },
    // { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
    // { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
  ];
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-12 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hotel Details
            </h2>
            <p className="mt-4 text-gray-500">
              A hotel is a commercial establishment that provides lodging,
              accommodation, and often additional services to travelers and
              guests.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  {feature.name === "Rating" ? (
                    <dd className="mt-2">
                      <RatingStars stars={feature.stars || 0} />
                    </dd>
                  ) : (
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>

        {/* amenities */}
        <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 sm:text-4xl">
          Amenities{" "}
        </h2>

        <div className="max-w-5xl mx-auto mt-8">
          <div className="border-l-2 border-gray-500 pl-8">
            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={breakfast}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />

                <span>Break Fast</span>
              </div>
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  className="peer sr-only opacity-0"
                  id="breakfast"
                />
                <label
                  htmlFor="breakfast"
                  className="relative flex ml-2 b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={pool}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Private Pool</span>
              </div>
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="pool"
                />
                <label
                  htmlFor="pool"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={wify}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>WIFI</span>
              </div>
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="wify"
                />
                <label
                  htmlFor="wify"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={ac}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>AC</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="ac"
                />
                <label
                  htmlFor="ac"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={spas}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Spas</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="spas"
                />
                <label
                  htmlFor="spas"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={charging}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Charging Station</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="charging"
                />
                <label
                  htmlFor="charging"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={fitness}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Fitness Zone</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="fitness"
                />
                <label
                  htmlFor="fitness"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={minibar}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Mini Bar</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="minibar"
                />
                <label
                  htmlFor="minibar"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={smoking}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Allow Smoking</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="smoking"
                />
                <label
                  htmlFor="smoking"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={pets}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Allow Pets</span>
              </div>
              <div className="flex justify-end">

                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="pets"
                />
                <label
                  htmlFor="pets"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={free}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Free Cancellation</span>
              </div>
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="free"
                />
                <label
                  htmlFor="free"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between  mt-8">
              <div className="flex flex-inline">
                <img
                  src={parking}
                  alt="Authentication Icon"
                  className="flex-shrink-0 w-6 h-6"
                />
                <span>Parking Facility</span>
              </div>
              <div className="flex justify-end">
                <input
                  type="checkbox"
                  className="peer sr-only opacity-0 "
                  id="parking"
                />
                <label
                  htmlFor="parking"
                  className="relative flex ml-2  b-2 h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  style={{ order: 1 }}
                >
                  <span className="sr-only">Enable</span>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HotelInfo;
