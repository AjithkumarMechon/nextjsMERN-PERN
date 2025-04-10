'use client';
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserDropdown from "@/component/signoutDropdown/UserSignoutDropdown";

const NavDetails:React.FC =()=> {
  const { data: session } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const pathname = usePathname();
  useEffect(() => {
      setToken(Cookies.get("token"));   
  }, [pathname]);

  return (
    <nav className="bg-white grid grid-cols-6  w-full borderborder border-black shadow-lg h-[4rem]" >
      {/* Left Side - Logo */}
      <div className="col-span-2 flex items-center mx-auto cursor-pointer" onClick={() => redirect(token ? '/dashboard' : '/login')} >
        {/* <img
          src="/efiling_logo.svg" // Replace with your logo path
          alt="Logo"
          className="h-10"
        /> */}
        <h3 className="text-red-400">AK</h3>
        <h3 className="text-blue-400">Trends</h3>
       </div>
      <div className="px-64 col-span-1"></div>
      {/* Right Side - Menu */}

<div className="col-span-3 grid-flow-dense justify items-center  bg-white h-[4rem]">
  <div className="flex items-center h-[4rem]  space-x-2 mx-4">
    <button className=" w-full  flex justify-center  text-gray-600 hover:text-black">📞 <span className="hidden lg:block mx-1">
      Call Us</span> </button>
    <button className=" w-full flex justify-center  text-gray-600 hover:text-black">🌐 <span className=" hidden lg:block mx-1">English  ▾</span></button>
    <div className=" w-full items-center space-x-2 hidden md:flex">
      <button className= " w-full text-gray-600 hover:text-black">A-</button>
      <button className=" w-full text-gray-600 hover:text-black">A</button>
      <button className= " w-full text-gray-600 hover:text-black">A+</button>
    <button className=" w-full text-gray-600 hover:text-black">🌓</button>
    </div>
    <button className=" w-full px-4 py-1 bg-blue-600 text-white rounded">
      <a href="/register">Register</a>
    </button>
    {(session || token) && (
      <div className="w-24 mx-auto">
        <UserDropdown session={session} token={token} />
      </div>
    )}
  </div>
</div>
    </nav>
  );
}

export default NavDetails;
