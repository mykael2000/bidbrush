import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function PortfolioCreate() {
  const { errors } = usePage().props;

  const [data, setData] = useState({
    title: '',
    description: '',
    image: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);

    Inertia.post('/portfolio', formData);
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Artwork</h2>}
    >
      <Head title="Add Artwork" />

      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={data.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.title && <div className="text-sm text-red-600 mt-1">{errors.title}</div>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (optional)
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              {errors.description && (
                <div className="text-sm text-red-600 mt-1">{errors.description}</div>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Artwork Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.image && <div className="text-sm text-red-600 mt-1">{errors.image}</div>}
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 transition ease-in-out duration-150"
              >
                Upload Artwork
              </button>

              <Link
                href="/portfolio"
                className="ml-4 text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
