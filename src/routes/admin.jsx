import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import {useNavigate} from 'react-router-dom'

const AdminRoot = () => {
  const navigate = useNavigate()

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
    <div>
      <nav className="fixed bg-black h-screen w-52 p-4">
        <h1 className="text-white">Logo</h1>
        <div className="relative h-full w-full mt-6">
          <h2 className="text-white" onClick={handleLogout}>Menu 1</h2>
        </div>
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  )
};

export default AdminRoot;
