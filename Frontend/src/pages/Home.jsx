import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 py-4 bg-background-light/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-3xl font-bold">water_drop</span>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">BloodConnect</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#how">Home</a>
            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#how">Find Donor</a>
            <Link to="/donate" className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">Become a Donor</Link>
            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#cta">About Us</a>
          </nav>
          <Link to="/signin" className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-transform active:scale-95">
            <span>Sign In</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
                  Emergency Support
                </span>
                <h1 className="text-slate-900 dark:text-slate-100 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                  Find Blood Donors <span className="text-primary">Near You</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                  Connecting those in need with life-saving donors in their local community. Fast, reliable, and secure access to donors when every second counts.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/donate" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  <span>Find Donor</span>
                </Link>
                <Link to="/donate" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-primary text-slate-900 dark:text-slate-100 text-base font-bold hover:bg-primary/5 transition-all">
                  <span>Become a Donor</span>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-background-light bg-slate-200" title="Avatar of a smiling donor person"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-background-light bg-slate-300" title="Avatar of a medical professional"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-background-light bg-slate-400" title="Avatar of a young blood donor"></div>
                </div>
                <span>Joined by 10,000+ local heroes</span>
              </div>
            </div>

            {/* Right Side - Illustration Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden relative bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-9xl opacity-20">favorite</span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="bg-primary/5 py-20 px-6" id="how">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 text-center mb-16">
              <h2 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-extrabold tracking-tight">
                How It Works
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                Three simple steps to save a life or find the help you need in your neighborhood.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">search</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Search</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Enter your location and required blood type to see all verified available donors in your immediate area.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">person_search</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Find</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Browse through our list of verified and willing donors. Filter by proximity, availability, and rating.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center gap-6 p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">forum</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Contact</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Connect securely with donors via our platform to coordinate the donation process quickly and safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6" id="cta">
          <div className="max-w-5xl mx-auto rounded-3xl bg-primary px-8 py-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10 flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Ready to Make a Difference?</h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto">
                  Join our community of heroes today. Your simple contribution can save up to three lives. Registration takes less than 2 minutes.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/donate" className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-10 bg-white text-primary text-base font-extrabold hover:bg-slate-50 transition-colors shadow-xl">
                  <span>Register Now</span>
                </Link>
                <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-10 bg-primary/20 border border-white/30 text-white text-base font-bold backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span>Learn More</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-light dark:bg-background-dark border-t border-primary/10 px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">water_drop</span>
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">BloodConnect</h2>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a className="text-slate-500 hover:text-primary text-sm font-medium transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-primary text-sm font-medium transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-primary text-sm font-medium transition-colors" href="#">Contact Us</a>
            <a className="text-slate-500 hover:text-primary text-sm font-medium transition-colors" href="#">Health Guidelines</a>
          </nav>
          <p className="text-slate-400 text-sm">© 2025 BloodConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
