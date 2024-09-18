<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Role;
use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        // $this->authorize('viewAny', Staff::class);
        $staff = Staff::with('role')->get();
        return Inertia::render('Staff/Index', ['staff' => $staff]);
    }

    public function create()
    {
        $roles = Role::all();
        $banks = Bank::all();
        $nextCode = $this->getNextCode();
        return Inertia::render('Staff/Create', [
            'roles' => $roles,
            'banks' => $banks,
            'nextCode' => $nextCode,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email',
            'phone' => 'required|string|max:20',
            'role_id' => 'required|exists:roles,id',
            'code' => 'required|string|size:4|unique:staff',
            'bank_id' => 'nullable|exists:banks,id',
            'iban' => 'nullable|string|size:23',
            'account_number' => 'nullable|string|size:12',
        ]);

        Staff::create($validated);

        return redirect()->route('staff.index')->with('success', 'Staff member created successfully.');
    }

    private function getNextCode()
    {
        $lastCode = Staff::withTrashed()->max('code');
        if (!$lastCode) {
            return '1201';
        }
        return str_pad((int)$lastCode + 1, 4, '0', STR_PAD_LEFT);
    }

    public function edit(Staff $staff)
    {
        $roles = Role::all();
        $banks = Bank::all();
        return Inertia::render('Staff/Edit', [
            'staff' => $staff,
            'roles' => $roles,
            'banks' => $banks,
        ]);
    }

    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email,' . $staff->id,
            'phone' => 'required|string|max:20',
            'role_id' => 'required|exists:roles,id',
            'bank_id' => 'nullable|exists:banks,id',
            'iban' => 'nullable|string|size:23',
            'account_number' => 'nullable|string|size:12',
        ]);

        $staff->update($validated);

        return redirect()->route('staff.index')->with('success', 'Staff member updated successfully.');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete(); // This will now soft delete the staff member
        return redirect()->route('staff.index')->with('success', 'Staff member deleted successfully.');
    }

    // If you want to permanently delete a staff member
    public function forceDelete($id)
    {
        $staff = Staff::withTrashed()->findOrFail($id);
        $staff->forceDelete();
        return redirect()->route('staff.index')->with('success', 'Staff member permanently deleted.');
    }

    // If you want to restore a soft-deleted staff member
    public function restore($id)
    {
        $staff = Staff::withTrashed()->findOrFail($id);
        $staff->restore();
        return redirect()->route('staff.index')->with('success', 'Staff member restored successfully.');
    }
}