import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="font-sans bg-[#f8f6f6] text-slate-900">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold w-fit">
            Emergency Support
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Find Blood Donors <span className="text-red-600">Near You</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-lg">
            Connecting those in need with life-saving donors in their local
            community. Fast, reliable, and secure.
          </p>

          <div className="flex gap-4">
            <Link to="/find-donor" className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition">
              Find Donor
            </Link>
            <Link to="/donate" className="border border-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition">
              Become a Donor
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Joined by <b>10,000+</b> local heroes
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-100 to-red-50 aspect-square rounded-3xl flex items-center justify-center">
          <span className="text-9xl">🩸</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-red-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold">How It Works</h2>
          <p className="text-gray-500 mt-4">Three simple steps to save a life.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="p-8 rounded-2xl bg-white shadow text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold text-xl mb-2">Search</h3>
            <p className="text-gray-500">
              Enter your location and blood type to see nearby donors.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow text-center">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="font-bold text-xl mb-2">Find</h3>
            <p className="text-gray-500">
              Browse verified donors near you and check availability.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold text-xl mb-2">Contact</h3>
            <p className="text-gray-500">
              Connect with the donor and arrange the donation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-red-600 text-white rounded-3xl p-16 text-center">
          <h2 className="text-4xl font-extrabold">Ready to Make a Difference?</h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
            Join our community of heroes today. Your simple contribution
            can save up to three lives.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <Link to="/donate" className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
              Register Now
            </Link>
            <a href="#" className="border border-white px-10 py-4 rounded-xl hover:bg-white/10 transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-red-200 py-12 px-6">
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
