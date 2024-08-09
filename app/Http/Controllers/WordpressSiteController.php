<?php

namespace App\Http\Controllers;

use App\Models\WordpressSite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class WordpressSiteController extends Controller
{
    public function index(Request $request): Response
    {
        $sites = WordpressSite::where('user_id', $request->user()->id)->paginate();

        return Inertia::render('WordpressSites/Index', [
            'sites' => $sites,
            'status' => session('status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('WordpressSites/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => 'required|string',
            'path' => 'required|string',
        ]);

        $validated['user_id'] = $request->user()->id;

        WordpressSite::create($validated);

        return Redirect::route('wordpress-sites.index')->withStatus('Successfully created.');
    }

    public function edit($id)
    {
        $userId = Auth::user()->id;
        $wordpressSite = WordpressSite::where('user_id', $userId)->find($id);
        return Inertia::render('WordpressSites/Edit', ['site' => $wordpressSite]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'path' => 'required|string',
            'site_name' => 'required|string',
        ]);

        try {
            $userId = Auth::user()->id;
            $wordpressSite = WordpressSite::where('user_id', $userId)->findOrFail($id);

            $wordpressSite->update($validated);
            return Redirect::route('wordpress-sites.index')->withStatus('Successfully updated.');
        } catch (\Throwable $th) {
            return Redirect::route('wordpress-sites.index')->withStatus('Failed');
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $userId = Auth::user()->id;
            $wordpressSite = WordpressSite::where('user_id', $userId)->findOrFail($id);

            $wordpressSite->delete();
            return Redirect::route('wordpress-sites.index')->withStatus('Successfully deleted');
        } catch (\Throwable $th) {
            return Redirect::route('wordpress-sites.index')->withStatus('Failed');
        }
    }
}
