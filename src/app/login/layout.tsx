import Footer from "@/Component/Footer/page";
import NavDetails from "@/Component/NavBar/NavDetails";
import Sidebar from "@/Component/Sidebar/page";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top black bar */}
      <div className="h-[20px] bg-black w-full fixed top-0 left-0 z-50" />

      {/* Navbar */}
      <header className="fixed top-[20px] left-0 w-full z-40 bg-gray-800 text-white h-[4rem]">
        <NavDetails />
      </header>

      {/* Main layout (Sidebar + Main Content) */}
      <div className="flex flex-1 pt-[5.25rem] pb-[3rem]">
           {/* Main content */}
        <main className="w-full p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center h-[3rem] z-50">
        <Footer />
      </footer>
    </div>
  );
}
