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

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Artworks by {auth.user.name}</h1>
            <Link
              href="/account/public/portfolio/create"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 transition ease-in-out duration-150"
            >
              + Add New Artwork
            </Link>
          </div>

          {artworks.length === 0 ? (
            <p className="text-gray-600">You haven’t uploaded any artworks yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                >
                  <img
                    src={`/account/public/storage/${artwork.image_path}`}
                    alt={artwork.title}
                    className="mb-3 h-48 w-full object-cover rounded"
                    onError={(e) => (e.target.src = '/placeholder.jpg')}
                  />
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {artwork.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {artwork.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
