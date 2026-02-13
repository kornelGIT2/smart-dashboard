import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentZmiana={1} />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 pt-16 overflow-auto pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
