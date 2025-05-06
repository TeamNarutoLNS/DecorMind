import React from 'react';
import Header from './_components/Header';

function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* Page content */}
      <main>{children}</main>
    </div>
  );
}

export default DashboardLayout;
