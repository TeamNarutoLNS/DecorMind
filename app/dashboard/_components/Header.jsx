"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";

function Header() {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <header className="flex flex-wrap justify-between items-center p-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#6a452e] to-[#bb9457] shadow-lg shadow-[#6a452e]/50 rounded-b-3xl">
      {/* Left Section: Logo and Tagline */}
      <div className="flex items-center gap-4">
        <Image
          src={"/Decormind_logo.png"}
          alt={"logo"}
          width={80}
          height={80}
          className="rounded-full shadow-md md:w-20 md:h-20"
        />
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-white">Decormind</h1>
          <p className="text-xs sm:text-sm text-white italic">
            Redefining spaces with AI
          </p>
        </div>
      </div>
      

      {/* Right Section: Buttons and User Info */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Buy Credits Button */}
        <Link href="/buy-credits">
          <button className="px-4 py-2 text-sm sm:text-base bg-[#f5f3f4] text-black font-semibold rounded-full hover:bg-yellow-300 transition duration-300">
            Buy Credits
          </button>
        </Link>

        {/* User Credits Display */}
        <div className="flex items-center bg-[#f5f3f4] shadow-md px-3 py-2 rounded-full">
          <Image src={"/star.png"} alt={"credits"} width={16} height={16} className="sm:w-5 sm:h-5" />
          <h2 className="text-black text-sm sm:text-base font-medium ml-2">{userDetail?.credits} Credits</h2>
        </div>

        {/* User Profile Button */}
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
