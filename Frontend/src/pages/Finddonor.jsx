import { useState } from "react";

function Finddonor() {
    const [location, setlocation] = useState("");
    const [blood, setblood] = useState("");
    const items = ["A+", "B+", "AB+", "AB-"];
    const donors = [
        {
            id: 24,
            name: "Fahimul Kadir",
            location: "Dhaka",
            bloodgroup: "A+",
            lastDonation: "2023-05-01",
            phoneNumber: "01712345678"

        },
        {
            id: 1,
            name: "Rahim Karim",
            location: "Dhaka",
            bloodgroup: "A+",
            lastDonation: "2023-05-01",
            phoneNumber: "01712345678"
        },
        {
            id: 5,
            name: "Tamim Iqbal",
            location: "Dhaka",
            bloodgroup: "A+",
            lastDonation: "2023-05-01",
            phoneNumber: "01712345678"
        }
    ]

    function handleSubmit() {
        if (blood == "") {
            alert("Please Select Blood Group")
        }
        else {
            alert(location + " " + blood);

        }
    }

    function dateConvertion(donationDate) {
        const date = new Date(donationDate);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    }

    return (
        <>
            <main className=" bg-[#f8f6f6] w-full">
                <div className="max-w-6xl flex-1 justify-center mx-auto p-4 md:p-8">
                    <div className="grid gap-2 mb-6">
                        <h1 className="text-3xl font-extrabold text-black">Find a Life-Saver</h1>
                        <h2 >Every drop counts. Search for eligible donors in  your vicinity</h2>
                    </div>

                    <div className="grid p-3 gap-4 bg-white rounded-xl shadow-sm md:grid-cols-12 md:p-5">
                        <div className="md:col-span-4">
                            <h3 className="text-[12px] text-slate-500 mb-1 font-bold">BLOOD GROUP</h3>
                            <div className="relative w-full rounded-lg ">
                                <div>
                                    <select className="w-full pl-10 h-10 outline-0 ring-1 ring-slate-200 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100  focus:ring-red-600 rounded-lg" value={blood}
                                        onChange={(e) => setblood(e.target.value)}>
                                        <option value="" disabled>Select Group</option>
                                        {items.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <span className="material-symbols-outlined text-red-500 absolute top-2 left-2">opacity</span>
                            </div>
                        </div>

                        <div className="md:col-span-6">
                            <h3 className="text-[12px] text-slate-500 mb-1 font-bold">LOCATION</h3>
                            <div className="relative w-full rounded-lg ">
                                <div>
                                    <input className="w-full pl-10 h-10 outline-0 ring-1 ring-slate-200 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100  focus:ring-red-600 rounded-lg placeholder-black"
                                        type="text"
                                        placeholder="Location"
                                        value={location}
                                        onChange={(e) => setlocation(e.target.value)}
                                    />
                                </div>
                                <span class="material-symbols-outlined text-red-500 absolute top-2 left-2">location_on</span>
                            </div>
                        </div>

                        <div className="flex items-end md:col-span-2">
                            <button className=" w-full h-10 bg-red-600 hover:bg-[#ea2a33]/90 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#ea2a33]/20 " onClick={handleSubmit}>
                                <span class="material-symbols-outlined" >search</span>
                                Search
                            </button>
                        </div>

                    </div>

                    {(donors.length == 0) ?
                        <div>
                            <h2>Sorry no result found</h2>

                        </div>
                        :
                        <div className="grid md:grid-cols-12 mt-7 gap-7">
                            <div className="col-span-7">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="font-bold"> Donors near you </h1>
                                    <span class="material-symbols-outlined text-red-600 bg-white p-1.5 rounded-lg ring-slate-200 ring-1" >sort</span>

                                </div>
                                <div className="grid gap-4">
                                    {donors.map((item, index) => (
                                        <div key={index} className="bg-white rounded-xl grid p-4 shadow-sm ring-[0.5px] ring-slate-200 hover:ring-red-600">
                                            <div className="flex justify-between">
                                                <span className="text-xl font-bold" >{item.name}</span>
                                                <span className="text-red-600 px-3 py-1 font-bold bg-[#ea2a33]/10 rounded-full">{item.bloodgroup}</span>
                                            </div>
                                            <h2 className="flex items-center gap-2 text-slate-500 text-sm"><span class="material-symbols-outlined text-[2px] ">location_on</span>{item.location}</h2>
                                            <div className="my-2">
                                                <h2 className="text-sm text-slate-400">Last Donation</h2>
                                                <h3 className="text-sm font-semibold">{dateConvertion(item.lastDonation)}</h3>
                                            </div>

                                            <button className=" w-full text-sm h-9 bg-red-500 hover:bg-[#ea2a33]/90 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#ea2a33]/20 " onClick={() => alert(item.phoneNumber)}>
                                                <span class="material-symbols-outlined" >call</span>
                                                Call Donor
                                            </button>

                                        </div>

                                    ))}
                                </div>
                            </div>

                            <div className="col-span-5 h-100 bg-slate-100 border-3 rounded-3xl border-white">
                                <h1>This Part will contain the map</h1>
                            </div>

                        </div>}
                </div>
            </main>
        </>
    )
}
export default Finddonor;