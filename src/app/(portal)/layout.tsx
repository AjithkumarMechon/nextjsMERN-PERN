'use client';

import React from 'react';

export default function RootLayout({
  children,
  navbar,
  footer,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Black Bar */}
      <div className="h-[20px] bg-black w-full fixed top-0 left-0 z-50" />

      {/* Navbar */}
      <header
        role="banner"
        className="fixed top-[20px] left-0 w-full z-40 bg-gray-800 text-white h-[4rem]"
      >
        {navbar}
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-[5.25rem] pb-[3rem]">
        {/* Sidebar */}
        <aside
          role="complementary"
          className="hidden md:block fixed top-[5.25rem] left-0 w-[240px] min-h-[calc(100vh-5.25rem-3rem)] bg-gray-100 z-30"
        >
          {sidebar}
        </aside>

        {/* Main Content */}
        <div className="w-full md:ml-[240px] p-6 overflow-y-auto h-[calc(100vh-5.25rem-3rem)]">
          <main className="h-full">{children}</main>
        </div>
      </div>

      {/* Footer */}
      <footer
        role="contentinfo"
        className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center h-[3rem] z-50"
      >
        {footer}
      </footer>
    </div>
  );
}
