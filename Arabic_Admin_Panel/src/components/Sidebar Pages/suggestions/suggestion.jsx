import { useState } from "react";
import { Loader } from "../../Loader/loader";
import { useSelector } from "react-redux";
import DeleteModal from "../../DeleteModal";
import { saveMiqatsToJSON } from "../createJson/createJson";
import { selectsuggestions } from "../../../StoreRedux/suggetionsSlice";


const Suggestions = () => {
  const [delId, setdelId] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const storeAllsuggestions = useSelector(selectsuggestions);
  const [loading, setLoading] = useState(false);
  console.log(storeAllsuggestions)
  return (
    <>
      <div>

        <div >
          <div className="flex items-center justify-center w-full ">
            <div className="flex items-center justify-start gap-2  w-full">
              {storeAllsuggestions && storeAllsuggestions.length > 0 && <span className="font-bold"> {storeAllsuggestions.length}</span>}
              <span className="font-bold text-2xl text-left w-full  text-purple-700">All suggestions</span>
            </div>
            {storeAllsuggestions && storeAllsuggestions.length > 0 &&
              <div className="text-right w-full flex items-center justify-end">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="font-semibold text-green-600">
                    Download Record (json)
                  </h2>
                  <div className="cursor-pointer" onClick={() => {
                    saveMiqatsToJSON(storeAllsuggestions, "suggestions")
                  }}>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="grid grid-cols-5  bg-gray-50 text-center  my-4 p-2">
            <h2 className="px-6 col-span-1   text-md font-bold  tracking-wider" >
              User Name
            </h2>

            <h2 className="px-2 col-span-1 hidden md:block  text-md font-bold "  >
              User Email
            </h2>
            <h2 className="px-2 col-span-3 md:col-span-2 text-md font-bold  ">
              Suggestion
            </h2>


            <h2 className="px-2 col-span-1   text-md font-bold  ">
              Actions
            </h2>


          </div>
        </div>
        {storeAllsuggestions && storeAllsuggestions.length > 0 ?

          storeAllsuggestions.map((suggestion, index) => {
            return <div key={index} className="px-8  py-4 shadow-lg border border-t-2 my-2 rounded-md grid grid-cols-5 7 text-center">

              <div className="text-sm  px-2 font-medium col-span-1   text-gray-900">
                {suggestion.userId && suggestion.userId.userName}
              </div>
              <div className="text-sm  px-2 font-medium col-span-1 hidden md:block  text-gray-900">
                {suggestion.userId && suggestion.userId.email}

              </div>

              <div className="text-sm  px-2 font-medium col-span-3   md:col-span-2 text-gray-900">
                {suggestion.SugDiscription}
              </div>



              <div className="text-sm font-medium col-span-1 flex items-center justify-center gap-2 text-gray-900">

                {/* delete */}
                <button

                  onClick={() => {
                    setshowModal(true);
                    setdelId(suggestion._id);

                  }}
                  className="ml-2 text-red-600 hover:text-red-900 text-2xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </div>


            </div>
          })

          : (
            <div >
              <p className="p-2 text-center font-semibold text-lg text-green-700">
                No suggestion found
              </p>
            </div >
          )

        }
      </div >


      <Loader loading={loading} />
      <DeleteModal
        setloading={setLoading}
        showModal={showModal}
        setshowModal={setshowModal}
        delId={delId}
        whatdelete="suggestion"
      />
    </>
  );
};

export default Suggestions;

