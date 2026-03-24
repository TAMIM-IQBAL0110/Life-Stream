import { Link } from "react-router-dom";

function Navbar() {

  const isLoggedIn = true;

  return (

    <header className="bg-[#f8f6f6] w-full h-[70px] flex justify-between items-center px-6 md:px-20 border-b border-red-200 sticky top-0 z-50">

      <Link to="/" className="flex gap-2 items-center">
        <span className="material-symbols-outlined text-red-600">water_drop</span>
        <span className="text-xl font-bold text-black">BloodConnect</span>
      </Link>

      <div>
        <nav className="hidden md:flex gap-8 text-sm font-medium justify-center items-center">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <Link to="/find-donor" className="hover:text-red-600 transition">Find Donor</Link>
          {isLoggedIn ?
            <Link to="/dashboard" className="hover:text-red-600 transition">Dashboard</Link>
            :
            <Link to="/donate" className="hover:text-red-600 transition">Become a Donor</Link>
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
      </div>

    </header>
  )
}
export default Navbar;