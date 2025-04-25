import { useState, useEffect, useRef, useCallback } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Cookies from "js-cookie";

const UserDropdown = ({ session, token }: { session: any; token: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div className="relative z-[100]" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer w-[2rem] h-[2rem]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
     <Image
        src="/profile_logo.jpg"
        alt="User"
        className="w-auto h-auto rounded-full"
        width={40}
        height={40}
/>
       
      </div>      
     {isOpen && (        
      <div className="absolute right-0 mt-2 shadow-lg bg-white rounded-lg z-[9999]" style={{minWidth:"10rem"}}>
         <h2 className="text-sm font-medium text-gray-700 py-[1rem] mx-[1rem]">{session?.user?.email ?? "User"}</h2>
          <button
            onClick={() => {
              Cookies.remove("token");
              signOut({ callbackUrl: "/" });
            }}
            className="flex mx-auto my-[0.5rem] px-2 py-1 text-sm text-blue-700 hover:bg-blue-500 hover:text-white border rounded-lg"
          >
            Logout
          </button>
         </div>
      )}
    </div>
  );
};

export default UserDropdown;
