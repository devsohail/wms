<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Services\CodeService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    protected $codeService;

    public function __construct(CodeService $codeService)
    {
        $this->codeService = $codeService;
    }

    public function index()
    {
        $customers = Customer::with('user:id,name')->get();
        return Inertia::render('Customers/Index', 
        [
            'customers' => $customers,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        $salesAgents = Staff::whereHas('role', function ($query) {
            $query->whereIn('name', ['Employee', 'Sales Team']);
        })->get();
        
        $nextCode = $this->codeService->generateNextCode();
        
        return Inertia::render('Customers/Create', [
            'salesAgents' => $salesAgents,
            'nextCode' => $nextCode,
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validatedData = $request->validate([
                'code' => 'required|string|max:10',
                'sales_agent_id' => 'nullable|exists:staff,id',
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:customers,email',
                'phone' => 'required|string|max:20',
                'address' => 'required|string',
                'ship_to_name' => 'required|string|max:255',
                'ship_to_email' => 'required|email',
                'ship_to_phone' => 'required|string|max:20',
                'ship_to_address' => 'required|string',
                'license_file' => 'nullable|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:2048',
                'trn' => 'nullable|string|max:255',
          
            ]);
            if ($request->hasFile('license_file')) {
                $path = $request->file('license_file')->store('customer_licenses', 'public');
                $validatedData['license_file'] = $path;
            }
            $validatedData['user_id'] = Auth::user()->id;
            $customer = Customer::create($validatedData);
            $this->codeService->assignCode($customer, $validatedData['code']);

            DB::commit();

            $nextCode = $this->codeService->generateNextCode();

            return redirect()->route('customers.index')
                ->with('nextCode', $nextCode)
                ->with('flash', 
                    [
                        'type' => 'success',
                        'message' => 'Customer Created successfully.'
                    ]
                );
        } catch (ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating customer: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while creating the customer. Please try again.')->withInput();
        }
    }


    public function edit(Customer $customer)
    {
        $salesAgents = Staff::whereHas('role', function ($query) {
            $query->whereIn('name', ['Employee', 'Sales Team']);
        })->get(['id', 'name']);

        return Inertia::render('Customers/Edit', [
            'customer' => $customer->load('salesAgent'),
            'salesAgents' => $salesAgents,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'sales_agent_id' => 'nullable|exists:staff,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'ship_to_name' => 'required|string|max:255',
            'ship_to_email' => 'required|email|max:255',
            'ship_to_phone' => 'required|string|max:20',
            'ship_to_address' => 'required|string',
            'license_file' => 'nullable|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:2048',
            'trn' => 'nullable|string|max:255',
        ]);
        if ($request->hasFile('license_file')) {
            // Delete old file if exists
            if ($customer->license_file) {
                Storage::disk('public')->delete($customer->license_file);
            }
            $path = $request->file('license_file')->store('customer_licenses', 'public');
            $validated['license_file'] = $path;
        }
        // If sales_agent_id is an empty string, set it to null
        if ($validated['sales_agent_id'] === '') {
            $validated['sales_agent_id'] = null;
        }

        $customer->update($validated);

        return redirect()->route('customers.index')
        ->with('flash', [
            'type' => 'success',
            'message' => 'Customer updated successfully.'
        ]);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index')->with('flash', 
        [
            'type' => 'success',
            'message' => 'Customer Deleted successfully.'
        ]
    );
    }
}