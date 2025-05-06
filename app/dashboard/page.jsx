"use client";
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Listing from './_components/Listing';

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <Listing />
      </main>

      {/* Footer */}
      <footer className="bg-[#8b6a55] text-white text-center py-4 shadow-inner">
        <p>&copy; {new Date().getFullYear()} DecorMind. Designed with 💡 and AI.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
