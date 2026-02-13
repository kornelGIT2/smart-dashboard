import { NavLink } from "react-router-dom";
import { LogOut, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { ZMIANY } from "../../../const/zmiany";
import { sidebarLinks } from "../../../const/navlinks";

export default function Sidebar({ currentZmiana }: { currentZmiana: number }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("Wylogowano");
  };

  const zmiana = ZMIANY.find((z) => z.id === currentZmiana) ?? ZMIANY[0];

  return (
    <aside className="hidden md:flex pt-20 flex-col w-64 bg-background shadow-sm text-gray-900 h-screen p-6 justify-between font-sans">
      {/* Logo + Nawigacja */}
      <div className="flex flex-col space-y-6">
        {/* Logo */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <img src="/logoSP.png" alt="Logo" className="h-20 rounded-lg" />
          </div>
          <div className="flex items-center justify-center mb-4 p-2 bg-gray-100 rounded shadow">
            <span className="font-semibold text-gray-800">Ostrów Maz.</span>
          </div>
          <div className="border-t border-gray-200" />
        </div>
        {/* Nawigacja */}
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-200 hover:text-yellow-600 transition 
                 ${isActive ? "bg-gray-200 font-semibold text-yellow-600" : "font-medium"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Stopka sidebaru */}
      <div className="flex flex-col space-y-4">
        {/* Zmiana */}
        {zmiana && (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-900 font-semibold">
            {zmiana.icon}
            <span>{zmiana.label}</span>
          </div>
        )}

        {/* Użytkownik */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-700" />
              <span className="font-medium text-gray-800 uppercase tracking-wide">
                Kornel U.
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-700 transition-transform ${
                userMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-12 left-0 w-full bg-white border rounded-lg shadow-lg flex flex-col z-50">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-left hover:bg-gray-100 transition flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Wyloguj się</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
