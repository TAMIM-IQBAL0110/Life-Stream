import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const isLoggedIn = false;
  const [open, setOpen] = useState(false);

  return (

    <header className="bg-[#f8f6f6] w-full h-17.5 flex justify-between items-center px-6 md:px-20 border-b border-red-200 sticky top-0 z-50">

      <Link to="/" className="flex gap-2 items-center">
        <span className="material-symbols-outlined text-red-600">water_drop</span>
        <span className="text-xl font-bold text-black">BloodConnect</span>
      </Link>

      {/* ✅ Desktop navbar */}
      <div>
        <nav className="hidden md:flex gap-8 text-sm font-medium justify-center items-center">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <Link to="/find-donor" className="hover:text-red-600 transition">Find Donor</Link>
          {isLoggedIn ?
            <Link to="/dashboard" className="hover:text-red-600 transition">Dashboard</Link>
            :
            <Link to="/become-a-donor" className="hover:text-red-600 transition">Become a Donor</Link>
          }
          
          <a href="#" className="hover:text-red-600 transition">About Us</a>
          {isLoggedIn ?
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
              Sign Out
            </button>
            :
            <Link to="/signin" className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
              Sign In
            </Link>
          }
        </nav>

        {/* ✅ Mobile menu */}
        {open && (
          <nav className="absolute top-17.5 left-0 w-full bg-white flex flex-col gap-4 p-6 shadow-md md:hidden text-sm font-medium">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/find-donor" onClick={() => setOpen(false)}>Find Donor</Link>
            {isLoggedIn ?
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              :
              <Link to="/donate" onClick={() => setOpen(false)}>Become a Donor</Link>
            }
            
            <a href="#" onClick={() => setOpen(false)}>About Us</a>
            {isLoggedIn ?
              <button className="bg-red-600 text-white px-5 py-2 rounded-lg">
                Sign Out
              </button>
              :
              <Link to="/signin" className="bg-red-600 text-white px-5 py-2 rounded-lg">
                Sign In
              </Link>
            }
          </nav>
        )}
      </div>

      {/* ✅ Hamburger button */}
      <button 
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

    </header>
  )
}

export default Navbar;