<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use App\Models\Staff;
class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with(['customer', 'vehicle'])->get();
        return Inertia::render('Jobs/Index', ['jobs' => $jobs]);
    }

    public function create()
    {
        $vehicles = Vehicle::all();
        $labourers = Staff::whereHas('role', function($query) {
            $query->where('name', 'labour');
        })->get();
        $lifters = Staff::whereHas('role', function($query) {
            $query->where('name', 'lifter');
        })->get();
        $customers = Customer::all();

        return Inertia::render('Jobs/Create', [
            'vehicles' => $vehicles,
            'labourers' => $labourers,
            'lifters' => $lifters,
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('Attempting to create job', $request->all());
        
        $validated = $request->validate([
            'job_number' => 'required|string|unique:jobs',
            'job_date' => 'required|date',
            'job_nature' => 'required|string',
            'client_name' => 'required',
            'vehicle_id' => 'required|exists:vehicles,id',
            'ctrn_number' => 'nullable|string',
            'seal_number' => 'nullable|string',
            'storage_price' => 'required|numeric',
            'storage_rate' => 'required|numeric',
            'handling_in_price' => 'required|numeric',
            'labour_contractor_id' => 'nullable|exists:users,id',
            'lifter_contractor_id' => 'nullable|exists:users,id',
            'repacking' => 'boolean',
            'comment' => 'nullable|string',
            'remarks' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'commodity' => 'nullable|string',
            'handling_out_charges' => 'nullable|numeric',
            'authorized_gate_pass_name' => 'nullable|string',
            'paid_amount' => 'nullable|numeric',
            'labour_id' => 'nullable|exists:users,id',
            'material_used' => 'nullable|string',
            'payment' => 'nullable|string',
            'storage_in_job_number' => 'nullable|string',
            'is_draft' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('job_images', 'public');
        }

        $validated['user_id'] = Auth::id();

        Job::create($validated);

        return redirect()->route('jobs.index')->with('success', 'Job created successfully.');
    }

    public function edit(Job $job)
    {
        $this->authorize('update', $job);
        $vehicles = Vehicle::all();
        $labourers = Staff::whereHas('role', function($query) {
            $query->where('name', 'labour');
        })->get();
        $lifters = Staff::whereHas('role', function($query) {
            $query->where('name', 'lifter');
        })->get();
        $customers = Customer::all();

        return Inertia::render('Jobs/Edit', [
            'job' => $job->load('vehicle', 'labourContractor', 'lifterContractor', 'labour'),
            'vehicles' => $vehicles,
            'labourers' => $labourers,
            'lifters' => $lifters,
            'customers' => $customers,
        ]);
    }

    public function update(Request $request, Job $job)
    {
        
        $validated = $request->validate([
            'job_number' => 'required|string|unique:jobs,job_number,' . $job->id,
            'job_date' => 'required|date',
            'job_nature' => 'required|string',
            'client_name' => 'required',
            'vehicle_id' => 'required|exists:vehicles,id',
            'ctrn_number' => 'nullable|string',
            'seal_number' => 'nullable|string',
            'storage_price' => 'required|numeric',
            'storage_rate' => 'required|numeric',
            'handling_in_price' => 'required|numeric',
            'labour_contractor_id' => 'nullable|exists:users,id',
            'lifter_contractor_id' => 'nullable|exists:users,id',
            'repacking' => 'boolean',
            'comment' => 'nullable|string',
            'remarks' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'commodity' => 'nullable|string',
            'handling_out_charges' => 'nullable|numeric',
            'authorized_gate_pass_name' => 'nullable|string',
            'paid_amount' => 'nullable|numeric',
            'labour_id' => 'nullable|exists:users,id',
            'material_used' => 'nullable|string',
            'payment' => 'nullable|string',
            'storage_in_job_number' => 'nullable|string',
            'is_draft' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('job_images', 'public');
        }

        $job->update($validated);

        return redirect()->route('jobs.index')->with('success', 'Job updated successfully.');
    }

    public function destroy(Job $job)
    {
        $this->authorize('delete', $job);
        $job->delete();
        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
    }

    public function finalize(Job $job)
    {
        $this->authorize('finalize', $job);
        $job->update(['is_finalized' => true, 'is_draft' => false]);
        return redirect()->route('jobs.index')->with('success', 'Job finalized successfully.');
    }
}