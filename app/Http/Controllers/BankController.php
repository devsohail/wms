<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankController extends Controller
{
    public function index()
    {
        $banks = Bank::all();
        return Inertia::render('Banks/Index', 
        [
            'banks' => $banks,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        return Inertia::render('Banks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        Bank::create($validated);

        return redirect()->route('banks.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record created successfully.'
        ]);
    }

    public function edit(Bank $bank)
    {
        return Inertia::render('Banks/Edit', ['bank' => $bank]);
    }

    public function update(Request $request, Bank $bank)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $bank->update($validated);

        return redirect()->route('banks.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record updated successfully.'
        ]);
    }

    public function destroy(Bank $bank)
    {
        $bank->delete();
        return redirect()->route('banks.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record deleted successfully.'
        ]);
    }
}