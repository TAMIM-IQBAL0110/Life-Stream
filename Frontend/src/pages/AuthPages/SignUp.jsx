import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    address: '',
    lastDonation: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-[#f8f6f6]">
      <Navbar />

      <main className="py-12 px-6">
        <div className="max-w-[560px] mx-auto">

          {/* Hero Section */}
          <div className="mb-8">
            <p className="text-red-600 font-bold uppercase text-sm">
              Join the mission
            </p>

            <h1 className="text-4xl font-black mt-2 text-slate-900">
              Become a Donor
            </h1>

            <p className="text-gray-500 mt-2">
              Your small contribution can save up to three lives.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

            {/* Name */}
            <div>
              <label className="text-sm font-bold text-slate-900">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-bold text-slate-900">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="text-sm font-bold text-slate-900">
                Blood Group
              </label>

              <select 
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              >
                <option value="">Select Blood Group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-bold text-slate-900">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-bold text-slate-900">
                Address
              </label>

              <textarea
                name="address"
                rows="3"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              />
            </div>

            {/* Last Donation */}
            <div>
              <label className="text-sm font-bold text-slate-900">
                Last Donation Date
              </label>

              <input
                type="date"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
                className="w-full border border-red-200 rounded-xl py-3 px-4 mt-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              />
            </div>

            {/* Checkbox */}
            <label className="flex gap-2 text-sm text-gray-600">
              <input 
                type="checkbox" 
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-red-200 accent-red-600"
              />
              I agree to the Terms and Conditions
            </label>

            {/* Button */}
            <button
              type="submit"
              className="bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition mt-4"
            >
              Register as Donor
            </button>

            <p className="text-center text-sm text-gray-500">
              Already registered? <Link to="/signin" className="text-red-600 font-bold hover:underline">Sign in here</Link>
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-200 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-red-600">
            <span className="text-3xl">🩸</span>
            <h2 className="text-xl font-bold">BloodConnect</h2>
          </div>

          <nav className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-red-600">Privacy Policy</a>
            <a href="#" className="hover:text-red-600">Terms</a>
            <a href="#" className="hover:text-red-600">Contact</a>
            <a href="#" className="hover:text-red-600">Health Guidelines</a>
          </nav>

          <p className="text-gray-400 text-sm">© 2024 BloodConnect</p>
        </div>
      </footer>
    </div>
  );
}
