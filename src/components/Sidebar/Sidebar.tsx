import { NavLink } from "react-router-dom";
import { LogOut, ChevronDown, User, LayoutGrid, MapPin } from "lucide-react";
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
    <aside className="hidden md:flex pt-20 flex-col w-64 border-r bg-card/95 backdrop-blur text-foreground h-screen p-5 justify-between font-sans">
      {/* Logo + Nawigacja */}
      <div className="flex flex-col space-y-5">
        {/* Logo */}
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <img src="/logoSP.png" alt="Logo" className="h-20" />
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 bg-muted rounded-lg border">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Ostrów Maz.</span>
          </div>
          <div className="border-t border-border" />
        </div>

        {/* Nawigacja */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2 text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            <LayoutGrid className="h-3.5 w-3.5" />
            Nawigacja
          </div>
          <nav className="flex flex-col space-y-1.5">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-lg text-sm transition-colors border border-transparent ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold border-primary/20"
                      : "font-medium text-foreground hover:bg-muted"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Stopka sidebaru */}
      <div className="flex flex-col space-y-4">
        {/* Zmiana */}
        {zmiana && (
          <div className="flex items-center space-x-2 px-3.5 py-2.5 rounded-lg bg-muted/70 border text-sm font-semibold">
            {zmiana.icon}
            <span>{zmiana.label}</span>
          </div>
        )}

        {/* Użytkownik */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full px-3.5 py-2.5 rounded-lg hover:bg-muted flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-sm uppercase tracking-wide">
                Kornel U.
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                userMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-12 left-0 w-full bg-popover border rounded-lg shadow-lg flex flex-col z-50">
              <button
                onClick={handleLogout}
                className="px-3.5 py-2.5 text-left hover:bg-muted transition flex items-center space-x-2 text-sm"
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
