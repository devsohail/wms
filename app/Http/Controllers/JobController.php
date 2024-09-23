<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Models\JobLog;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with(['customer', 'vehicle'])->get();
        return Inertia::render('Jobs/Index', 
        [
            'jobs' => $jobs,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        $customers = Customer::all();
        $vehicles = Vehicle::all();
        $laborContractors = Staff::whereHas('role', function($query) {
            $query->where('name', 'Labour');
        })->get();
        $lifters = Staff::whereHas('role', function($query) {
            $query->where('name', 'Lifter');
        })->get();
        return Inertia::render('Jobs/Create', [
            'customers' => $customers,
            'vehicles' => $vehicles,
            'laborContractors' => $laborContractors,
            'lifters' => $lifters,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_number' => 'required|unique:jobs',
            'job_date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'commodity' => 'nullable|string',
            'cntr_seal_no' => 'nullable|string',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'weight_slip_no' => 'nullable|string',
            'storage_type' => 'required|in:in,out',
            'supervisor_sign' => 'nullable|string',
            'g4g_team' => 'nullable|string',
            'vehicle_in' => 'nullable|date_format:H:i',
            'vehicle_out' => 'nullable|date_format:H:i',
            'bags_cartons' => 'nullable|integer',
            'pallets' => 'nullable|integer',
            'labour_contractor_id' => 'nullable|exists:staff,id',
            'labors_count' => 'nullable|integer',
            'labor_start_time' => 'nullable|date_format:H:i',
            'labor_end_time' => 'nullable|date_format:H:i',
            'lifter_contractor_id' => 'nullable|exists:staff,id',
            'lifter_start_time' => 'nullable|date_format:H:i',
            'lifter_end_time' => 'nullable|date_format:H:i',
        ]);

      Job::create([
            'job_number' => $validated['job_number'],
            'job_date' => $validated['job_date'],
            'customer_id' => $validated['customer_id'],
            'commodity' => $validated['commodity'],
            'cntr_seal_no' => $validated['cntr_seal_no'],
            'vehicle_id' => $validated['vehicle_id'],
            'weight_slip_no' => $validated['weight_slip_no'],
            'storage_type' => $validated['storage_type'],
            'supervisor_sign' => $validated['supervisor_sign'],
            'vehicle_in' => $validated['vehicle_in'],
            'vehicle_out' => $validated['vehicle_out'],
            'bags_cartons' => $validated['bags_cartons'],
            'pallets' => $validated['pallets'],
            'labour_contractor_id' => $validated['labour_contractor_id'],
            'labors_count' => $validated['labors_count'],
            'labor_start_time' => $validated['labor_start_time'],
            'labor_end_time' => $validated['labor_end_time'],
            'lifter_contractor_id' => $validated['lifter_contractor_id'],
            'lifter_start_time' => $validated['lifter_start_time'],
            'lifter_end_time' => $validated['lifter_end_time'],
            'user_id' => Auth::id()
        ]);

        return redirect()->route('jobs.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Job created successfully.'
        ]);
    }

    public function edit(Job $job)
    {
        $vehicles = Vehicle::all();
        $laborContractors = Staff::whereHas('role', function($query) {
            $query->where('name', 'Labour');
        })->get();
        $lifters = Staff::whereHas('role', function($query) {
            $query->where('name', 'Lifter');
        })->get();
        $customers = Customer::all();
        $laborContractor = Staff::find($job->labor_contractor_id);
        $lifter = Staff::find($job->lifter_contractor_id);
        return Inertia::render('Jobs/Edit', [
            'job' => $job->load('customer', 'vehicle', 'laborContractor', 'lifter'),
            'vehicles' => $vehicles,
            'laborContractors' => $laborContractors,
            'lifters' => $lifters,
            'customers' => $customers,
        ]);
    }

    public function update(Request $request, Job $job)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'job_number' => 'required|unique:jobs,job_number,' . $job->id,
            'job_date' => 'required|date',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'commodity' => 'nullable|string|max:255',
            'cntr_seal_no' => 'nullable|string|max:255',
            'weight_slip_no' => 'nullable|string|max:255',
            'storage_type' => ['required', Rule::in(['in', 'out'])],
            'supervisor_sign' => 'nullable|string|max:255',
            'vehicle_in' => 'nullable|date_format:H:i',
            'vehicle_out' => 'nullable|date_format:H:i',
            'bags_cartons' => 'nullable|integer|min:0',
            'pallets' => 'nullable|integer|min:0',
            'labor_contractor_id' => 'nullable|exists:staff,id',
            'labors_count' => 'nullable|integer|min:0',
            'labor_start_time' => 'nullable|date_format:H:i',
            'labor_end_time' => 'nullable|date_format:H:i',
            'lifter_id' => 'nullable|exists:staff,id',
            'lifter_start_time' => 'nullable|date_format:H:i',
            'lifter_end_time' => 'nullable|date_format:H:i',
            'is_draft' => 'boolean',
        ]);

        $job->update($validated);

        return redirect()->route('jobs.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Job updated successfully.'
        ]);
    }

    public function destroy(Job $job)
    {
        // $this->authorize('delete', $job);
        $job->delete();
        return redirect()->route('jobs.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Job deleted successfully.'
        ]);
    }

    public function finalize(Job $job)
    {
        // $this->authorize('finalize', $job);
        $job->update(['is_finalized' => true, 'is_draft' => false]);
        $this->logJobAction($job, 'finalized');
        return redirect()->route('jobs.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Job finalized successfully.'
        ]);
    }

    public function reopen(Job $job)
    {
        $job->update(['is_finalized' => false, 'is_draft' => true]);
        $this->logJobAction($job, 'reopened');
        return redirect()->route('jobs.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Job reopened successfully.'
        ]);
    }

    private function logJobAction($job, $action, $details = null)
    {
        JobLog::create([
            'job_id' => $job->id,
            'user_id' => auth()->id(),
            'action' => $action,
            'details' => $details,
        ]);
    }

    public function generateJobNumber($customerId)
    {
        $customer = Customer::findOrFail($customerId);
        $currentMonth = now()->format('m');
        $currentYear = now()->format('Y');
        $jobCount = Job::whereYear('created_at', $currentYear)
                       ->whereMonth('created_at', $currentMonth)
                       ->count() + 1;
        $dailyJobCount = Job::whereDate('created_at', now()->toDateString())->count();

        $jobNumber = sprintf(
            "4-%s-%s-%03d-%d",
            $customer->code,
            $currentMonth,
            $jobCount,
            $dailyJobCount
        );

        return response()->json(['job_number' => $jobNumber]);
    }
}