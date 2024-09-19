import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./sidebar.module.css"
import users from "../assests/users.png";
import dashboard from "../assests/dashboard.png";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../StoreRedux/adminSlice";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
export function Sidebar() {
    const location = useLocation()
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const Handlelogout = () => {
        dispatch(addAdmin(null))
        localStorage.removeItem('ARABIC_ADMIN_KEY_STRING');
        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }
        toast.success("Logout Successfully");
    };

    useEffect(() => {
        const handleResize = () => {
            setIsDrawerOpen(window.innerWidth > 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [

        {
            text: "User",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="2em"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill="#ff9500"
                        fillRule="evenodd"
                        d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2zm3 1h2v2H7zm2 4H7v2h2zm2-4h2v2h-2zm2 4h-2v2h2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
            submenu: [
                {
                    text: "Add User",
                    icon: (
                        <img
                            src={"/doors.png"}
                            alt="Authentication Icon"
                            className="flex-shrink-0 w-6 h-6"
                        />
                    ),
                    link: "/Admin/AddDoors",
                },
                {
                    text: "Details",
                    icon: (
                        <img
                            src={"/door2.png"}
                            alt="Authentication Icon"
                            className="flex-shrink-0 w-6 h-6"
                        />
                    ),
                    link: "/Admin/Doors",
                },
                // { text: "Invoice", link: "/" },
            ],
        },
        // {
        //     text: "Miqats",
        //     icon: (
        //         <img
        //             src={"/2place.png"}
        //             alt="Authentication Icon"
        //             className="flex-shrink-0 w-6 h-6"
        //         />
        //     ),
        //     submenu: [
        //         {
        //             text: "Add Miqat",
        //             icon: (
        //                 <img
        //                     src={"/miqats.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/AddMiqats",
        //         },
        //         {
        //             text: "All Miqats",
        //             icon: (
        //                 <img
        //                     src={"/places2.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/Miqats",
        //         },
        //         // { text: "Invoice", link: "/" },
        //     ],
        // },
        // {
        //     text: "Toilets",
        //     icon: (
        //         <img
        //             src={"/toilet_9157205.png"}
        //             alt="Authentication Icon"
        //             className="flex-shrink-0 w-6 h-6"
        //         />
        //     ),
        //     submenu: [
        //         {
        //             text: "Add Toilet",
        //             icon: (
        //                 <img
        //                     src={"/addtoilet.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/Addtoilets",
        //         },
        //         {
        //             text: "All Toilet",
        //             icon: (
        //                 <img
        //                     src={"/alltoilets.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/Toilets",
        //         },
        //         // { text: "Invoice", link: "/" },
        //     ],
        // },
        // {
        //     text: "Sites",
        //     icon: (
        //         <img
        //             src={"/toilet_9157205.png"}
        //             alt="Authentication Icon"
        //             className="flex-shrink-0 w-6 h-6"
        //         />
        //     ),
        //     submenu: [
        //         {
        //             text: "Add Site",
        //             icon: (
        //                 <img
        //                     src={"/addtoilet.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/Addsite",
        //         },
        //         {
        //             text: "All Sites",
        //             icon: (
        //                 <img
        //                     src={"/alltoilets.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/sites",
        //         },
        //         // { text: "Invoice", link: "/" },
        //     ],
        // },
        // {
        //     text: "Paratical Info Places",
        //     icon: (
        //         <img
        //             src={"/places-removebg-preview.png"}
        //             alt="Authentication Icon"
        //             className="flex-shrink-0 w-6 h-6"
        //         />
        //     ),
        //     submenu: [
        //         {
        //             text: "Add Info",
        //             icon: (
        //                 <img
        //                     src={"/makkha.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/AddInfo",
        //         },
               
        //         // {
        //         //     text: "",
        //         //     icon: (
        //         //         <img
        //         //             src={"/makkha.png"}
        //         //             alt="Authentication Icon"
        //         //             className="flex-shrink-0 w-6 h-6"
        //         //         />
        //         //     ),
        //         //     link: "/Admin/placesInfo",
        //         // },
        //         {
        //             text: "All Makkha Places",
        //             icon: (
        //                 <img
        //                     src={"/makkha.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/MakkkhaPlaces",
        //         },
        //         {
        //             text: "All Madina Places",
        //             icon: (
        //                 <img
        //                     src={"/madinaIcon1.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/MadinaPlaces",
        //         },
        //         // { text: "Invoice", link: "/" },
        //     ],
        // },
        // {
        //     text: "Hotels",
        //     icon: (
        //         <img
        //             src={"/review_3168643.png"}
        //             alt="Authentication Icon"
        //             className="flex-shrink-0 w-6 h-6"
        //         />
        //     ),
        //     submenu: [
        //         {
        //             text: "Add Hotels",
        //             icon: (
        //                 <img
        //                     src={"/hotel_3009487.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/Addhotels",
        //         },
        //         {
        //             text: "All Hotels",
        //             icon: (
        //                 <img
        //                     src={"/star_12052250.png"}
        //                     alt="Authentication Icon"
        //                     className="flex-shrink-0 w-6 h-6"
        //                 />
        //             ),
        //             link: "/Admin/hotels",
        //         },
        //         // { text: "Invoice", link: "/" },
        //     ],
        // },

    ];
    const [dropDownOpen, setDropDownOpen] = useState(menuItems.map(() => false));

    const toggelDropDown = (index) => {
        const updatedState = dropDownOpen
        updatedState[index] = !updatedState[index];
        setDropDownOpen([...updatedState]);
    };
    return (<>
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-purple-600 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-inline justify-between items-center">
                <div className="flex justify-start items-center">
                    <button
                        aria-label="Toggle sidebar"
                        onClick={toggleDrawer}
                        className="p-1 mr-1 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            aria-hidden="true"
                            className={`w-6 h-6 ${isDrawerOpen ? 'hidden' : ''}`}

                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            className={`w-6 h-6 ${isDrawerOpen ? '' : 'hidden'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                    <Link to="/Admin/starter" className="flex items-center justify-between mr-4 sm:ml-6">
                    <FaWhatsapp className="text-green-400 h-12 w-12" />
                    <span className="self-center font-sans font-bold text-2xl whitespace-nowrap text-white">
                            WhatsApp Admin Panel
                        </span>
                    </Link>

                </div>
                <div className="flex items-center lg:order-2">
                    <button
                        type="button"
                        data-drawer-toggle="drawer-navigation"
                        data-drawer-target="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        onClick={toggleDrawer}
                    >
                        <span className="sr-only">Toggle navigation</span>

                    </button>

                </div>
            </div>
        </nav>

        {/* <!-- Sidebar --> */}

        <aside
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                } border-r border-gray-200 md:translate-x-0 bg-purple-600 dark:border-gray-700`}
            aria-label="Sidenav"
            id="drawer-navigation"

        >
            <div className="overflow-y-auto py-5 px-3 h-full dark:bg-purple-600">

                <ul className="space-y-2 h-96 ">
                    <div className={`${style.heightScroll} pt-3 `}>
                        <li className="my-2">
                            <Link
                                to="/Admin/starter"
                                className={` ${location.pathname === "/Admin/starter" ? "bg-gray-100 text-black" : "text-white"} flex items-center p-2 text-base font-medium  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-200 hover:text-black group`}
                            >
                                <img
                                    src={dashboard}
                                    alt="Authentication Icon"
                                    className="flex-shrink-0 w-6 h-6"
                                />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/Admin/users"
                                className={` ${location.pathname === "/Admin/users" ? "bg-gray-100 text-black" : "text-white"} flex items-center p-2 text-base font-medium  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-200 hover:text-black group`}
                            >
                                <img
                                    src={users}
                                    alt="Authentication Icon"
                                    className="flex-shrink-0 w-6 h-6"
                                />
                                <span className="ml-3">Users</span>
                            </Link>
                        </li>
                        <li className="my-2">
                            <Link
                                to="/Admin/Suggestions"
                                className={` ${location.pathname === "/Admin/Suggestions" ? "bg-gray-100 text-black" : "text-white"} flex items-center p-2 text-base font-medium  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-200 hover:text-black group`}
                            >
                                <img
                                    src={"/suggestion.png"}
                                    alt="Suggestions Icon"
                                    className="flex-shrink-0 w-6 h-6"
                                />
                                <span className="ml-3">Guide</span>
                            </Link>
                        </li>

                        {menuItems &&
                            menuItems.map((item, index) => (
                                <li key={index} className="my-2">
                                    <div
                                        onClick={() => {
                                            toggelDropDown(index);
                                        }}
                                        className="flex items-center cursor-pointer p-2 w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-gray-200 hover:text-black"
                                    >
                                        <span>{item.icon}</span>
                                        <span className="flex-1 ml-3 text-left  whitespace-nowrap">
                                            {item.text}
                                        </span>
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 hover:text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <ul
                                        style={{
                                            display: dropDownOpen[index] ? "block" : "none",
                                        }}
                                        className="hidden py-2 space-y-2"
                                    >
                                        {item.submenu.map((menu, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={menu.link}
                                                    className={` ${location.pathname === menu.link ? "bg-gray-100 text-black" : " text-white"} flex items-center p-2 text-base font-medium  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 hover:text-black group`}
                                                >
                                                    <span>{menu.icon}</span>
                                                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                                        {menu.text}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                    </div>
                </ul>

                <div className="absolute cursor-pointer flex bottom-0 w-full" onClick={Handlelogout}>
                    <div
                        className="inline-flex  px-14 mb-2 left-0  py-2 bottom-0 gap-1 transform text-xl font-semibold font-mono text-white border border-white rounded hover:bg-violet-600 hover:text-black bg-gray-700 focus:outline-none focus:ring"
                    >
                        <span className="text-md" >
                            Log Out
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mt-1"
                            width="2em"
                            height="1em"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M3 3a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1m10.293 9.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 1 0-1.414 1.414L14.586 9H7a1 1 0 1 0 0 2h7.586z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </aside>
    </>)
}