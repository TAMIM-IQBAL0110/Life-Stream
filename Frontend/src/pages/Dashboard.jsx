import { useState } from "react";

function Dashboard() {
    const name = "Fahimul Kadir";
    const bloodgroup = "O Positive (O+)";
    const eligible_to_donate = true;
    const [available, setavailability] = useState(false);

    return (
        <div className="bg-[#f8f6f6]">
        <div className="dashboard-container flex-1 max-w-6xl mx-auto w-full p-4 lg:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-[#ea2a33]/5">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight">{name}</h1>
                        </div>
                        <p className="text-[#ea2a33] text-lg font-semibold mt-1">Blood Group: {bloodgroup}</p>
                        <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-sm">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                </div>
                <button className="flex min-w-35 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-[#ea2a33] text-white text-sm font-bold shadow-lg shadow-[#ea2a33]/20 hover:bg-[#ea2a33]/90 transition-all">
                    <span className="material-symbols-outlined text-lg">edit</span>
                    <span>Edit Profile</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#ea2a33]/10 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Last Donation</p>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-extrabold">October 12, 2023</p>
                    <p className="text-xs text-slate-400">4 months since last visit</p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#ea2a33]/10 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#ea2a33]/10 rounded-lg text-[#ea2a33]">
                            <span className="material-symbols-outlined">favorite</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Lives Saved</p>
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 text-2xl font-extrabold">12 Lives</p>
                    <p className="text-xs text-slate-400">Based on 4 successful donations</p>
                </div>

                <div className="flex flex-col gap-3 rounded-xl p-6 bg-white dark:bg-slate-900 border border-[#ea2a33]/10 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium ">Eligibility Status</p>
                    </div>
                    {eligible_to_donate ? <div>
                        <p className="text-green-600 dark:text-green-400 text-2xl font-extrabold">Eligible to Donate</p>
                        <p className="text-xs text-slate-400 mt-2">Perfect for the next donation</p>
                    </div>
                        : <div>
                            <p className="text-red-600 dark:text-red-400 text-2xl font-extrabold">Not eligible to Donate</p>
                            <p className="text-xs text-slate-400 mt-2">Not eligible for the donation</p>
                        </div>}

                </div>
                <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#ea2a33]/10 bg-white dark:bg-slate-900 p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#ea2a33]/10 rounded-full text-[#ea2a33]">
                            <span className="material-symbols-outlined text-2xl">notifications_active</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Donation Availability</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Toggle your status to let hospitals and patients know if you are ready to donate blood right now.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        {available ? <span className="text-sm font-bold text-[#ea2a33]">I am currently available</span> : <span className="text-sm font-bold text-slate-500">I am currently unavailable</span>}
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input checked={available} onChange={(e) => setavailability(e.target.checked)} className="sr-only peer" type="checkbox" value="" />
                            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#ea2a33]"></div>
                        </label>
                    </div>
                </div>
            </div>


            <div className="mt-8 p-6 bg-linear-to-r from-[#ea2a33] to-rose-600 rounded-xl text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-full">
                        <h3 className="text-xl font-bold mb-2">Ready for your next donation?</h3>
                        <p className="text-white/80 text-sm">Drink plenty of water and have a healthy meal before you visit the donation center!</p>
                        <p className="text-white/80 text-sm">Your contribution saves lives!</p>
                    </div>
                </div>
            </div>

            </div>
            </div>
    )
}
export default Dashboard