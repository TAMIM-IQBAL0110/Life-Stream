import { Link } from "react-router-dom";

const Navbar = ()=> {
  return (
    <header className="flex items-center justify-between border-b border-red-200 px-6 md:px-20 py-4 sticky top-0 bg-white z-50">
      <Link to="/" className="flex items-center gap-2 text-red-600 hover:opacity-80 transition">
        <span className="text-3xl">🩸</span>
        <h2 className="text-xl font-bold">BloodConnect</h2>
      </Link>

      <nav className="hidden md:flex gap-8 text-sm font-medium">
        <Link to="/" className="hover:text-red-600 transition">Home</Link>
        <Link to="/find-donor" className="hover:text-red-600 transition">Find Donor</Link>
        <Link to="/donate" className="hover:text-red-600 transition">Become a Donor</Link>
        <a href="#" className="hover:text-red-600 transition">About Us</a>
      </nav>

      <Link to="/signin" className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition">
        Sign In
      </Link>
    </header>
  );
}
export default Navbar;