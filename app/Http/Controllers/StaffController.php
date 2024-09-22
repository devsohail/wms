<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Role;
use App\Models\Bank;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CodeService;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StaffController extends Controller
{
    protected $codeService;

    public function __construct(CodeService $codeService)
    {
        $this->codeService = $codeService;
    }

    public function index()
    {
        // $this->authorize('viewAny', Staff::class);
        $staff = Staff::with('role')->get();
        return Inertia::render('Staff/Index', 
        [
            'staff' => $staff,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        $banks = Bank::all();
        $nextCode = $this->codeService->generateNextCode();

        return Inertia::render('Staff/Create', [
            'roles' => $roles,
            'banks' => $banks,
            'nextCode' => $nextCode,
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
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

            $staff = Staff::create($validated);
            $this->codeService->assignCode($staff, $validated['code']);

            DB::commit();

            $nextCode = $this->codeService->generateNextCode();

            return redirect()->route('staff.index')
                ->with('nextCode', $nextCode)
                ->with('flash', 
                [
                    'type' => 'success',
                    'message' => 'Record created successfully.'
                ]);
        } catch (ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating staff member: ' . $e->getMessage());
            return back()->withErrors(['general' => 'An error occurred while creating the staff member. Please try again.'])->withInput();
        }
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

        return redirect()->route('staff.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Record updated successfully.'
        ]);
    }

    public function destroy(Staff $staff)
    {
        $staff->delete(); // This will now soft delete the staff member
        return redirect()->route('staff.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Staff member deleted successfully.'
        ]);
    }

    // If you want to permanently delete a staff member
    public function forceDelete($id)
    {
        $staff = Staff::withTrashed()->findOrFail($id);
        $staff->forceDelete();
        return redirect()->route('staff.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Staff member permanently deleted.'
        ]);
    }

    // If you want to restore a soft-deleted staff member
    public function restore($id)
    {
        $staff = Staff::withTrashed()->findOrFail($id);
        $staff->restore();
        return redirect()->route('staff.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Staff member restored successfully.'
        ]);
    }
}
