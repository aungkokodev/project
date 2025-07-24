<?php

namespace App\Http\Controllers\Web;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AddressController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname'   => 'required|string|max:255',
            'phone'      => 'required|string|max:20',
            'type'       => 'required|in:shipping,billing',
            'street'     => 'required|string|max:255',
            'city'       => 'required|string|max:100',
            'state'      => 'required|string|max:100',
            'zip_code'   => 'nullable|string|max:20',
            'country'    => 'required|string|max:100',
            'label'      => 'nullable|string|max:100',
            'is_default' => 'boolean',
        ]);

        if ($validated['is_default']) {
            Address::where('user_id', Auth::id())
                ->where('type', $validated['type'])
                ->update(['is_default' => false]);
        }

        Auth::user()->addresses()->create($validated);

        return back()->with('success', 'Address added.');
    }

    public function update(Request $request, string $id)
    {
        $address = Address::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $validated = $request->validate([
            'fullname'   => 'required|string|max:255',
            'phone'      => 'required|string|max:20',
            'type'       => 'required|in:shipping,billing',
            'street'     => 'required|string|max:255',
            'city'       => 'required|string|max:100',
            'state'      => 'required|string|max:100',
            'zip_code'   => 'nullable|string|max:20',
            'country'    => 'required|string|max:100',
            'label'      => 'nullable|string|max:100',
            'is_default' => 'boolean',
        ]);

        if ($validated['is_default']) {
            Address::where('user_id', Auth::id())
                ->where('type', $validated['type'])
                ->update(['is_default' => false]);
        }

        $address->update($validated);

        return back()->with('success', 'Address updated.');
    }

    public function destroy(string $id)
    {
        $address = Address::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $address->delete();

        return back()->with('success', 'Address deleted.');
    }
}
