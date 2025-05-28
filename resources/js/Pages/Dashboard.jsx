import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    // Dummy data for demonstration purposes
    const dummyData = {
        userName: "Art Enthusiast", // You can use auth.user.name here later
        totalArtworks: 15,
        activeAuctions: 3,
        totalBidsReceived: 42,
        totalEarnings: 1500000, // Nigerian Naira
        isProUser: false, // Set to true to see the Pro section disappear
        recentBids: [
            { id: 1, amount: 50000, artworkTitle: 'Serene Sunset', timeAgo: '10 mins ago' },
            { id: 2, amount: 75000, artworkTitle: 'Urban Abstract', timeAgo: '30 mins ago' },
            { id: 3, amount: 120000, artworkTitle: 'Portrait of a Dream', timeAgo: '1 hour ago' },
        ],
        notifications: [
            { id: 1, message: 'Your artwork "Golden Horizon" has a new bid!' },
            { id: 2, message: 'You have a new message from a potential buyer.' },
            { id: 3, message: 'Your auction for "Morning Mist" ends in 2 hours!' },
        ],
    };

    // We'll still use usePage().props to simulate receiving data,
    // but for now, it will be the dummyData.
    const { auth } = usePage().props; // Still need auth for user.name placeholder if desired

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bidbrush Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Welcome Section */}
                    <div className="bg-white shadow-xl sm:rounded-lg p-6 sm:p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome, {auth.user ? auth.user.name : dummyData.userName}!
                        </h3>
                        <p className="text-gray-700">
                            You're logged in and ready to manage your art empire.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link
                                href="/account/public/portfolio/create"
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Artwork
                            </Link>
                            <Link
                                href="/account/public/portfolio"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                View My Portfolio
                            </Link>
                        </div>
                    </div>

                    {/* Key Metrics / KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Card 1: Total Artworks */}
                        <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Artworks</p>
                                <p className="text-3xl font-extrabold text-indigo-700">{dummyData.totalArtworks}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>

                        {/* Card 2: Active Auctions */}
                        <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Auctions</p>
                                <p className="text-3xl font-extrabold text-green-600">{dummyData.activeAuctions}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        {/* Card 3: Total Bids Received */}
                        <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Bids Received</p>
                                <p className="text-3xl font-extrabold text-purple-700">{dummyData.totalBidsReceived}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7l.5-4.5.5.5m0 0l4.5 4.5m-4.5-4.5l-4.5 4.5m4.5-4.5l4.5 4.5M3 12h18M6 12a2 2 0 11-4 0 2 2 0 014 0zM18 12a2 2 0 11-4 0 2 2 0 014 0zM10 12a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>

                        {/* Card 4: Total Earnings */}
                        <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                                <p className="text-3xl font-extrabold text-blue-700">₦{dummyData.totalEarnings.toLocaleString()}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Pro Version Section / Call to Action */}
                    {!dummyData.isProUser && (
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between mb-8">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <h3 className="text-2xl font-bold mb-2">Unlock More with Bidbrush Pro!</h3>
                                <p className="text-indigo-100">
                                    Get direct messaging, priority support, and enhanced analytics. [cite: 10]
                                </p>
                            </div>
                            <Link
                                href="/account/public/pro-upgrade"
                                className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 font-bold rounded-full shadow hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Upgrade to Pro
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    )}

                    {/* Recent Activity / Notifications Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Bids</h3>
                            {dummyData.recentBids.length > 0 ? (
                                <ul className="space-y-3">
                                    {dummyData.recentBids.map((bid) => (
                                        <li key={bid.id} className="flex items-center justify-between text-gray-700 border-b pb-2 last:border-b-0 last:pb-0">
                                            <span>
                                                New bid of <span className="font-semibold">₦{bid.amount.toLocaleString()}</span> on "{bid.artworkTitle}"
                                            </span>
                                            <span className="text-sm text-gray-500">{bid.timeAgo}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No recent bids to display.</p>
                            )}
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Notifications</h3>
                            {dummyData.notifications.length > 0 ? (
                                <ul className="space-y-3">
                                    {dummyData.notifications.map((notification) => (
                                        <li key={notification.id} className="flex items-center text-gray-700 border-b pb-2 last:border-b-0 last:pb-0">
                                            <span className="mr-2 text-indigo-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                                </svg>
                                            </span>
                                            <span>{notification.message}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No new notifications.</p>
                            )}
                        </div>
                    </div>

                    {/* Educational / Marketing Section */}
                    <div className="mt-8 bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-lg p-6 shadow-xl">
                        <h3 className="text-2xl font-bold mb-3">Maximize Your Reach!</h3>
                        <p className="mb-4 text-indigo-100">
                            Explore our tips on content marketing and social media to showcase your artworks effectively. [cite: 20, 18]
                            Bidbrush is poised to revolutionize the art industry in Nigeria and beyond. [cite: 22]
                        </p>
                        <Link
                            href="/account/public/blog"
                            className="inline-flex items-center px-5 py-2 bg-white text-blue-700 font-bold rounded-full shadow hover:bg-gray-100 transition duration-300"
                        >
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
