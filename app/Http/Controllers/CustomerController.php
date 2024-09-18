<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with('user:id,name')->get();
        return Inertia::render('Customers/Index', ['customers' => $customers]);
    }

    public function create()
    {
        $salesAgents = Staff::whereHas('role', function ($query) {
            $query->whereIn('name', ['Employee', 'Sales Team']);
        })->get();
        
        $nextCode = $this->getNextCode();
        
        return Inertia::render('Customers/Create', [
            'salesAgents' => $salesAgents,
            'nextCode' => $nextCode,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|size:4|unique:customers',
            'sales_agent_id' => 'nullable|exists:staff,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'ship_to_name' => 'required|string|max:255',
            'ship_to_email' => 'required|email|max:255',
            'ship_to_phone' => 'required|string|max:20',
            'ship_to_address' => 'required|string',
        ]);

        // If sales_agent_id is an empty string, set it to null
        if ($validated['sales_agent_id'] === '') {
            $validated['sales_agent_id'] = null;
        }
        $validated['user_id'] = Auth::id();
        Customer::create($validated);

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }

    private function getNextCode()
    {
        $lastCode = Staff::withTrashed()->max('code');
        if (!$lastCode) {
            return '1201';
        }
        return str_pad((int)$lastCode + 1, 4, '0', STR_PAD_LEFT);
    }

    public function edit(Customer $customer)
    {
        $salesAgents = Staff::whereHas('role', function ($query) {
            $query->whereIn('name', ['Employee', 'Sales Team']);
        })->get(['id', 'name']);

        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
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
        ]);

        // If sales_agent_id is an empty string, set it to null
        if ($validated['sales_agent_id'] === '') {
            $validated['sales_agent_id'] = null;
        }

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}