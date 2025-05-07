"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f5ebe0] shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-[#5f4339]">DecorMind</span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#5f4339] md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden md:flex space-x-8">
          <li><Link href="/" className="text-[#5f4339] hover:text-[#8b6a55] font-medium">Home</Link></li>
          <li><Link href="/Contact" className="text-[#5f4339] hover:text-[#8b6a55] font-medium">Contact</Link></li>
          <li><Link href="/About" className="text-[#5f4339] hover:text-[#8b6a55] font-medium">About</Link></li>
          <li><Link href="/buy-credits" className="text-[#5f4339] hover:text-[#8b6a55] font-medium">Buy Credits</Link></li>
        </ul>

        <Link
          href="/dashboard"
          className="hidden md:inline-block px-5 py-2 bg-[#5f4339] text-white font-medium rounded-lg shadow-md hover:bg-[#8b6a55] transition"
        >
          Dashboard
        </Link>
      </div>

      {menuOpen && (
        <ul className="mt-4 flex flex-col space-y-4 md:hidden">
          <li><Link href="/" className="text-[#5f4339] font-medium">Home</Link></li>
          <li><Link href="/Contact" className="text-[#5f4339] font-medium">Contact</Link></li>
          <li><Link href="/About" className="text-[#5f4339] font-medium">About</Link></li>
          <li><Link href="/buy-credits" className="text-[#5f4339] font-medium">Buy Credits</Link></li>
          <li>
            <Link
              href="/dashboard"
              className="block w-full px-5 py-2 bg-[#5f4339] text-white font-medium rounded-lg text-center"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}