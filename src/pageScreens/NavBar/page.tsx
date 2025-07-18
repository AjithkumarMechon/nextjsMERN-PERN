"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserDropdown from "@/Component/signoutDropdown/UserSignoutDropdown";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState<any>(null);
  const pathname = usePathname();
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [pathname]);

  return (
    <nav className="bg-white grid grid-cols-10  w-full borderborder border-black shadow-lg h-[4rem]">
      {/* Left Side - Logo */}
      <div
        className="col-span-2 flex items-center mx-auto cursor-pointer"
        onClick={() => redirect(token ? "/dashboard" : "/dashboard")}
      >
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

      <div className="col-span-7 grid-flow-dense justify items-center  bg-white h-[4rem]">
        <div className="flex items-center h-[4rem]  space-x-2 mx-4">
          <button className=" w-full  flex justify-center  text-gray-600 hover:text-black">
            <Link href="/home">Home</Link>
          </button>
          <button className=" w-full flex justify-center  text-gray-600 hover:text-black">
            <Link href="/contact">Contact</Link>
          </button>
          <button className=" w-full flex justify-center  text-gray-600 hover:text-black">
            <Link href="/about">About</Link>
          </button>

          <input
            type="search"
            className="border border-gray-400 text-base px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100  text-gray-600 hover:text-black"
            placeholder="search..."
          />
          {(session || token) && (
            <div className="w-24 px-[0.5rem] mx-auto">
              <UserDropdown session={session} token={token} />
            </div>
          )}
          <div>
            <button className=" w-full px-4 py-1 bg-blue-600 text-white rounded">
              <Link href="/register">Signup</Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
