import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Keep Inertia.js for form submission
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
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // State for image preview

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setData({ ...data, image: file });
            if (file) {
                setImagePreviewUrl(URL.createObjectURL(file)); // Create URL for preview
            } else {
                setImagePreviewUrl(null);
            }
        } else {
            setData({ ...data, [name]: value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description || ''); // Send empty string if description is null
        formData.append('image', data.image);

        // Use Inertia.post for file uploads
        Inertia.post('/account/public/portfolio', formData, {
            forceFormData: true, // Crucial for file uploads with Inertia.js v1 (if using latest)
            onSuccess: () => {
                // Optional: Clear form or show success message after successful submission
                setData({
                    title: '',
                    description: '',
                    image: null,
                });
                setImagePreviewUrl(null);
            },
        });
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Artwork</h2>}
        >
            <Head title="Add Artwork" />

            <div className="py-8 px-4 sm:px-6 lg:px-8"> {/* Added horizontal padding */}
                <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8"> {/* Larger padding, more prominent shadow */}
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                        Upload Your Artwork
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                                Title of Artwork <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={data.title}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm p-2.5" // Enhanced input styling
                                placeholder="e.g., Sunset Over the Mountains"
                                required
                            />
                            {errors.title && (
                                <div className="text-sm text-red-600 mt-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.327a1 1 0 011.486 0l5.5 9.75A1 1 0 0114.25 14H5.75a1 1 0 01-.73-1.673l5.5-9.75zM11 15a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                                Description (optional)
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={data.description}
                                onChange={handleChange}
                                rows="4"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm p-2.5 resize-y" // Added resize-y
                                placeholder="Tell us more about your artwork..."
                            ></textarea>
                            {errors.description && (
                                <div className="text-sm text-red-600 mt-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.327a1 1 0 011.486 0l5.5 9.75A1 1 0 0114.25 14H5.75a1 1 0 01-.73-1.673l5.5-9.75zM11 15a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
                                Artwork Image <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="block w-full text-sm text-gray-900
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-indigo-50 file:text-indigo-700
                                                hover:file:bg-indigo-100
                                                cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" // Styled file input
                                    required
                                />
                                {imagePreviewUrl && (
                                    <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                                        <img
                                            src={imagePreviewUrl}
                                            alt="Image Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.image && (
                                <div className="text-sm text-red-600 mt-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.327a1 1 0 011.486 0l5.5 9.75A1 1 0 0114.25 14H5.75a1 1 0 01-.73-1.673l5.5-9.75zM11 15a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.image}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4"> {/* Responsive button layout */}
                            <Link
                                href="/account/public/portfolio"
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out order-2 sm:order-1" // Button order for mobile
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out order-1 sm:order-2" // Button order for mobile
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5.5 13a3.5 3.5 1001-3.5-3.5V7.5a3.5 3.5 0013.5-3.5h.5c.969 0 1.936.19 2.842.564A.75.75 00118 7.5v.5c0 1.969-.391 3.936-1.178 5.747a.75.75 001-1.302-3.877z" />
                                </svg>
                                Upload Artwork
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
