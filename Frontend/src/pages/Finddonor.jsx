import { useMemo, useState } from "react";

const DONORS = [
    {
        id: 1,
        name: "David Mitchell",
        bloodGroup: "O+",
        distance: 0.8,
        location: "Central Hospital District",
        lastDonation: "Aug 12, 2023",
        availability: "Immediate",
        availabilityColor: "text-green-600",
        phone: "+1-312-555-0108",
        mapPosition: { left: "40%", top: "30%" },
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        bloodGroup: "O-",
        distance: 1.4,
        location: "North Medical Avenue",
        lastDonation: "Jan 05, 2024",
        availability: "Within 2h",
        availabilityColor: "text-green-600",
        phone: "+1-312-555-0120",
        mapPosition: { left: "65%", top: "60%" },
    },
    {
        id: 3,
        name: "Marcus Chen",
        bloodGroup: "A+",
        distance: 2.1,
        location: "Lakeview Emergency Lane",
        lastDonation: "Nov 18, 2023",
        availability: "After 6 PM",
        availabilityColor: "text-yellow-600",
        phone: "+1-312-555-0144",
        mapPosition: { left: "75%", top: "20%" },
    },
    {
        id: 4,
        name: "Amelia Turner",
        bloodGroup: "B+",
        distance: 3.2,
        location: "Central Hospital District",
        lastDonation: "Feb 10, 2024",
        availability: "Tomorrow Morning",
        availabilityColor: "text-yellow-600",
        phone: "+1-312-555-0181",
        mapPosition: { left: "25%", top: "50%" },
    },
    {
        id: 5,
        name: "Noah Williams",
        bloodGroup: "AB-",
        distance: 4.5,
        location: "South City Care Point",
        lastDonation: "Dec 22, 2023",
        availability: "Immediate",
        availabilityColor: "text-green-600",
        phone: "+1-312-555-0198",
        mapPosition: { left: "54%", top: "78%" },
    },
];

const BLOOD_GROUP_OPTIONS = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Finddonor() {
    const [draftBloodGroup, setDraftBloodGroup] = useState("All");
    const [draftLocation, setDraftLocation] = useState("Central Hospital District");
    const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("Central Hospital District");
    const [sortMode, setSortMode] = useState("nearest");
    const [activeDonorId, setActiveDonorId] = useState(null);

    const filteredDonors = useMemo(() => {
        const normalizedLocation = selectedLocation.trim().toLowerCase();

        const filtered = DONORS.filter((donor) => {
            const bloodMatch = selectedBloodGroup === "All" || donor.bloodGroup === selectedBloodGroup;
            const locationMatch = !normalizedLocation || donor.location.toLowerCase().includes(normalizedLocation);
            return bloodMatch && locationMatch;
        });

        const sorted = [...filtered].sort((a, b) => {
            if (sortMode === "distance-desc") {
                return b.distance - a.distance;
            }
            if (sortMode === "name") {
                return a.name.localeCompare(b.name);
            }
            return a.distance - b.distance;
        });

        return sorted;
    }, [selectedBloodGroup, selectedLocation, sortMode]);

    const activeDonor = filteredDonors.find((donor) => donor.id === activeDonorId) ?? filteredDonors[0] ?? null;

    const handleSearch = () => {
        setSelectedBloodGroup(draftBloodGroup);
        setSelectedLocation(draftLocation);
        setActiveDonorId(null);
    };

    return (
        <div className="finddonor-container relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f6f6] pb-20 text-slate-900 dark:bg-background-dark dark:text-slate-100 md:pb-0">
            <header className="sticky top-0 z-50 w-full border-b border-[#ea2a33]/10 bg-[#f8f6f6]/80 px-4 py-3 backdrop-blur-md dark:bg-background-dark/80 md:px-10">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-2 text-[#ea2a33]">
                        <span className="material-symbols-outlined text-3xl font-bold">water_drop</span>
                        <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">BloodConnect</h2>
                    </div>
                    <nav className="hidden items-center gap-8 md:flex">
                        <a className="text-sm font-semibold text-[#ea2a33] transition-colors hover:text-[#ea2a33]" href="#">Find Donor</a>
                        <a className="text-sm font-semibold transition-colors hover:text-[#ea2a33]" href="#">Requests</a>
                        <a className="text-sm font-semibold transition-colors hover:text-[#ea2a33]" href="#">My Profile</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ea2a33]/10 text-[#ea2a33] transition-colors hover:bg-[#ea2a33]/20" type="button">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </button>
                        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#ea2a33]/20 bg-slate-200 dark:bg-slate-700">
                            <img
                                className="h-full w-full object-cover"
                                data-alt="User profile avatar portrait"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5TnSy1j9MOCEZ9f7NB0z82O77gLAyhBiwgbZijsVuyOMTilCM1nCI5lBHZ2NJdTqgtg47AsYz38lqiEqZWalAxNPb5pIF9D2lReeyE9B0I0X5P9w4a2wdDjEgID8PkQXyVN0jWN0c5t5vcS49AP9l92YzvT5i3VG69N4pyO9cWhojhMKTp4otBH58WZOKUJUy7CCNFT7un7JPjQhiD73twENxlslMvg7nSkqUhW9FB8wcWQSZgyVbdsdwDlbfdWnM3Fg6gJcCaW7D"
                                alt="User profile avatar"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-10">
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">Find a Life-Saver</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Every drop counts. Search for eligible donors in your vicinity.</p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:grid-cols-12">
                    <div className="flex flex-col gap-1.5 md:col-span-4">
                        <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="blood-group-select">
                            Blood Group
                        </label>
                        <div className="relative">
                            <select
                                id="blood-group-select"
                                className="h-12 w-full rounded-lg border-slate-200 bg-slate-50 pl-10 pr-4 text-slate-900 focus:border-[#ea2a33] focus:ring-[#ea2a33] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                value={draftBloodGroup}
                                onChange={(event) => setDraftBloodGroup(event.target.value)}
                            >
                                {BLOOD_GROUP_OPTIONS.map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute left-3 top-3 text-[#ea2a33]">opacity</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-6">
                        <label className="ml-1 text-xs font-bold uppercase tracking-wider text-slate-500" htmlFor="location-input">
                            Location
                        </label>
                        <div className="relative">
                            <input
                                id="location-input"
                                className="h-12 w-full rounded-lg border-slate-200 bg-slate-50 pl-10 pr-4 text-slate-900 focus:border-[#ea2a33] focus:ring-[#ea2a33] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                placeholder="Enter city or area..."
                                type="text"
                                value={draftLocation}
                                onChange={(event) => setDraftLocation(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                            <span className="material-symbols-outlined absolute left-3 top-3 text-[#ea2a33]">location_on</span>
                        </div>
                    </div>

                    <div className="flex items-end md:col-span-2">
                        <button
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ea2a33] font-bold text-white shadow-lg shadow-[#ea2a33]/20 transition-transform active:scale-95 hover:bg-[#ea2a33]/90"
                            type="button"
                            onClick={handleSearch}
                        >
                            <span className="material-symbols-outlined">search</span>
                            Search
                        </button>
                    </div>
                </div>

                <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="space-y-4 lg:col-span-7">
                        <div className="mb-2 flex items-center justify-between gap-3">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200">
                                {filteredDonors.length} Donor{filteredDonors.length === 1 ? "" : "s"} found near you
                            </h3>
                            <div className="flex gap-2">
                                <label className="sr-only" htmlFor="sort-mode-select">
                                    Sort donor list
                                </label>
                                <select
                                    id="sort-mode-select"
                                    className="rounded-lg border border-slate-200 bg-white p-2 text-sm text-[#ea2a33] dark:border-slate-700 dark:bg-slate-800"
                                    value={sortMode}
                                    onChange={(event) => setSortMode(event.target.value)}
                                >
                                    <option value="nearest">Nearest first</option>
                                    <option value="distance-desc">Farthest first</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>
                        </div>

                        {filteredDonors.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-600 dark:bg-slate-800">
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">No donors match your filters</p>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try changing blood group or a broader location to see more donors.</p>
                            </div>
                        ) : (
                            filteredDonors.map((donor) => {
                                const isActive = activeDonor?.id === donor.id;

                                return (
                                    <div
                                        key={donor.id}
                                        className={`group flex cursor-pointer flex-col gap-5 rounded-xl border bg-white p-5 shadow-sm transition-all dark:bg-slate-800 md:flex-row ${
                                            isActive
                                                ? "border-[#ea2a33] ring-2 ring-[#ea2a33]/20 dark:border-[#ea2a33]"
                                                : "border-slate-200 hover:border-[#ea2a33]/50 dark:border-slate-700"
                                        }`}
                                        onClick={() => setActiveDonorId(donor.id)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                setActiveDonorId(donor.id);
                                            }
                                        }}
                                    >
                                        <div className="grow">
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">{donor.name}</h4>
                                                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                                        {donor.distance} miles away
                                                    </div>
                                                </div>
                                                <div className="rounded-full bg-[#ea2a33]/10 px-3 py-1 text-lg font-black text-[#ea2a33]">{donor.bloodGroup}</div>
                                            </div>
                                            <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-slate-400">Last Donation</p>
                                                    <p className="font-semibold">{donor.lastDonation}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400">Availability</p>
                                                    <p className={`font-semibold ${donor.availabilityColor}`}>{donor.availability}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <a
                                                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#ea2a33] text-sm font-bold text-white"
                                                    href={`tel:${donor.phone}`}
                                                    onClick={(event) => event.stopPropagation()}
                                                >
                                                    <span className="material-symbols-outlined text-lg">call</span>
                                                    Call Donor
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="sticky top-28 hidden h-[calc(100vh-250px)] lg:col-span-5 lg:block">
                        <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white bg-slate-200 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                            <div
                                className="absolute inset-0 bg-slate-100 dark:bg-slate-900"
                                data-location={selectedLocation || "All Areas"}
                                style={{
                                    backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            >
                                {filteredDonors.map((donor) => {
                                    const isActive = activeDonor?.id === donor.id;

                                    return (
                                        <button
                                            key={donor.id}
                                            type="button"
                                            className="group absolute cursor-pointer"
                                            style={{ left: donor.mapPosition.left, top: donor.mapPosition.top }}
                                            onClick={() => setActiveDonorId(donor.id)}
                                        >
                                            <div
                                                className={`transform rounded-full p-2 text-white shadow-lg transition-transform group-hover:scale-110 ${
                                                    isActive ? "bg-[#ea2a33]" : "bg-[#ea2a33]/65"
                                                }`}
                                            >
                                                <span className="material-symbols-outlined block text-2xl">location_on</span>
                                            </div>
                                            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1 text-xs font-bold shadow-md opacity-0 transition-opacity group-hover:opacity-100 dark:bg-slate-800">
                                                {donor.name.split(" ")[0]} ({donor.bloodGroup})
                                            </div>
                                        </button>
                                    );
                                })}

                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-25"></div>
                                        <div className="relative rounded-full border-4 border-white bg-blue-600 p-2 shadow-lg dark:border-slate-800">
                                            <span className="material-symbols-outlined block text-white">my_location</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-md dark:bg-slate-800 dark:text-slate-200">
                                {activeDonor ? `Focused donor: ${activeDonor.name}` : "Select a donor card"}
                            </div>

                            <div className="absolute right-6 top-6">
                                <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-md dark:bg-slate-800 dark:text-slate-200" type="button">
                                    <span className="material-symbols-outlined text-lg">layers</span>
                                    Satellite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
                <a className="flex flex-col items-center gap-1 text-[#ea2a33]" href="#">
                    <span className="material-symbols-outlined">search</span>
                    <span className="text-[10px] font-bold uppercase">Find</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="text-[10px] font-bold uppercase">Requests</span>
                </a>
                <a className="-mt-8 flex flex-col items-center gap-1 rounded-full border-4 border-[#f8f6f6] bg-[#ea2a33] p-3 text-white shadow-lg shadow-[#ea2a33]/30 dark:border-background-dark" href="#">
                    <span className="material-symbols-outlined">add</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
                    <span className="material-symbols-outlined">chat</span>
                    <span className="text-[10px] font-bold uppercase">Messages</span>
                </a>
                <a className="flex flex-col items-center gap-1 text-slate-400" href="#">
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-bold uppercase">Profile</span>
                </a>
            </div>
        </div>
    );
}

export default Finddonor;