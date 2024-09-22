<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::all();
        return Inertia::render('Vehicles/Index', 
        [
            'vehicles' => $vehicles,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        return Inertia::render('Vehicles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'required|string|max:20|unique:vehicles',
            'type' => 'required|string|max:255',
        ]);

        Vehicle::create($validated);

        return redirect()->route('vehicles.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record created successfully.'
        ]);
    }

    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Edit', ['vehicle' => $vehicle]);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'license_plate' => 'required|string|max:20|unique:vehicles,license_plate,' . $vehicle->id,
            'type' => 'required|string|max:255',
        ]);

        $vehicle->update($validated);

        return redirect()->route('vehicles.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record updated successfully.'
        ]);
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return redirect()->route('vehicles.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record deleted successfully.'
        ]);
    }
}