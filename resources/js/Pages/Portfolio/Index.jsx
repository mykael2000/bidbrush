import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PortfolioIndex() {
    const { artworks, auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Portfolio</h2>}
        >
            <Head title="Portfolio" />

            <div className="py-8 px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding for small screens */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"> {/* Flex column on small, row on larger. Added gap */}
                        <h1 className="text-3xl font-extrabold text-gray-900 text-center sm:text-left"> {/* Larger, bolder heading */}
                            Artworks by {auth.user.name}
                        </h1>
                        <Link
                            href="/account/public/portfolio/create"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-indigo-700 border border-transparent rounded-full font-bold text-white shadow-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-300 transform hover:scale-105" // More prominent, rounded, and interactive button
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add New Artwork
                        </Link>
                    </div>

                    {artworks.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center"> {/* Centered message in a card */}
                            <p className="text-lg text-gray-700 mb-4">You haven’t uploaded any artworks yet.</p>
                            <p className="text-gray-500">Click "Add New Artwork" to start building your portfolio!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"> {/* Adjusted grid for more columns on larger screens */}
                            {artworks.map((artwork) => (
                                <Link
                                    key={artwork.id}
                                    href={`/account/public/portfolio/${artwork.id}`} // Link to individual artwork details
                                    className="block bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-103 hover:shadow-xl transition duration-300 ease-in-out group" // Better card styling and hover
                                >
                                    <div className="relative overflow-hidden w-full h-56 sm:h-48"> {/* Fixed height image container */}
                                        <img
                                            src={`/account/public/storage/${artwork.image_path}`}
                                            alt={artwork.title || 'Artwork image'} // Fallback alt text
                                            className="w-full h-full object-cover group-hover:opacity-90 transition duration-300" // Image zoom/fade on hover
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevents infinite loop if placeholder also fails
                                                e.target.src = '/images/placeholder.jpg'; // Assuming placeholder.jpg in public folder
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"> {/* Overlay for title/description on hover */}
                                            <h3 className="text-white text-xl font-bold truncate">
                                                {artwork.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {artwork.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-3"> {/* line-clamp for consistent description height */}
                                            {artwork.description || 'No description provided.'} {/* Fallback text for description */}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
