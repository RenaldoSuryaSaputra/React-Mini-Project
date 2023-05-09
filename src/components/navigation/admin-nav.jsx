import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import {useNavigate} from 'react-router-dom'

const AdminNav = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Logout Sukses")
      navigate("/")

    }).catch((error) => {
      // An error happened.
      console.log(error)
    });    
  }

  return (
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-600 h-screen p-5 pt-8 relative  duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute bg-white cursor-pointer -right-3 top-9 w-7 h-7 shadow-md
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        >
          <path
            filerule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>

        <div className="flex gap-x-4 items-center">
          <img
            // src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <p
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            PasarSekawan Seller
          </p>
        </div>
        <ul className="pt-6">
          <li>
            <Link
              to="/"
              className="flex  rounded-md p-2 cursor-pointer hover:bg-white hover:text-black text-gray-300 text-md items-center gap-x-4 mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Home
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="flex rounded-md p-2 cursor-pointer hover:bg-white hover:text-black text-gray-300 text-md items-center gap-x-4 mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Seller Information
              </span>
            </Link>
          </li>
          <li className="flex rounded-md p-2 cursor-pointer hover:bg-white hover:text-black text-gray-300 text-md items-center gap-x-4 mt-9"
          onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                filerule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>

            <span 
            className={`${!open && "hidden"} origin-left duration-200`} >
              Logout
            </span>
          </li>
        </ul>
      </div>
  );
};

export default AdminNav;
