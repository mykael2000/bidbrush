<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PortfolioController extends Controller
{
        public function index()
    {
        // Get artworks uploaded by the logged-in user
        $artworks = Auth::user()->artworks()->latest()->get();

        return Inertia::render('Portfolio/Index', [
            'artworks' => $artworks,
        ]);
    }

    public function create()
    {
        return Inertia::render('Portfolio/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048', // max 2MB
        ]);

        $path = $request->file('image')->store('artworks', 'public');

        Auth::user()->artworks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $path,
        ]);

        return redirect()->route('portfolio.index')->with('success', 'Artwork added successfully');
    }
}
