import { NavLink, Outlet } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[rgb(52,58,64)] backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 text-[rgb(253,126,0)]">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold tracking-wide hover:text-cyan-300 transition"
          >
            Drug Targets 3D Human
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-8 text-white">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "hover:text-cyan-300 transition"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ModelPage"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "hover:text-cyan-300 transition"
                }
              >
                ModelPage
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "hover:text-cyan-300 transition"
                }
              >
                Contact us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-cyan-400 font-semibold"
                    : "hover:text-cyan-300 transition"
                }
              >
                {user ? user.email : "Log in / Sign up"}
              </NavLink>
            </li>

          </ul>

          {/* MOBILE RIGHT ICONS */}
          <div className="flex items-center gap-4 md:hidden">

            {/* Account icon ONLY mobile */}
            {user && (
  <NavLink
    to="/Signup"
    className="md:hidden text-cyan-400 hover:text-cyan-300 transition text-xl"
  >
    👤
  </NavLink>
)}


            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="space-y-1"
            >
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>

          </div>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-slate-950 border-t border-white/10 px-6 py-4">
            <ul className="flex flex-col space-y-4 text-slate-300">

              <li>
                <NavLink to="/" onClick={() => setOpen(false)}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/ModelPage" onClick={() => setOpen(false)}>
                  ModelPage
                </NavLink>
              </li>

              <li>
                <NavLink to="/Contact" onClick={() => setOpen(false)}>
                  Contact us
                </NavLink>
              </li>

              <li>
                <NavLink to="/Signup" onClick={() => setOpen(false)}>
                  {user ? user.email : "Log in / Sign up"}
                </NavLink>
              </li>

            </ul>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 container mx-auto px-4 py-4">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-200 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <p className="font-semibold">Stockholm</p>
            <p>Gustavslundsvägen 151 D, Bromma</p>
            <p>08–442 95 00</p>
          </div>

          <div>
            <p className="font-semibold">Göteborg</p>
            <p>Anders Personsgatan 14</p>
            <p>031–83 28 31</p>
          </div>

          <div>
            <p className="font-semibold">Malmö</p>
            <p>Drottninggatan 4B</p>
            <p>040–643 96 10</p>
          </div>

        </div>

        <div className="text-center text-xs text-gray-400 pb-2">
          © {new Date().getFullYear()} Medieinstitutet
        </div>
      </footer>
    </div>
  );
};
