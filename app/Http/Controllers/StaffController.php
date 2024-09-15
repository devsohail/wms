<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Staff::class);
        $staff = Staff::with('role')->get();
        return Inertia::render('Staff/Index', ['staff' => $staff]);
    }

    public function create()
    {
        $this->authorize('create', Staff::class);
        $roles = Role::where('id', '<>', 1)->get();
        return Inertia::render('Staff/Create', ['roles' => $roles]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Staff::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email',
            'phone' => 'required|string|max:20',
            'role_id' => 'required|exists:roles,id',
            'create_user' => 'boolean',
            'password' => 'required_if:create_user,true|nullable|min:8',
        ]);

        $staff = Staff::create($validated);

        if ($validated['create_user']) {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ])->roles()->attach($validated['role_id']);
        }

        return redirect()->route('staff.index')->with('success', 'Staff member created successfully.');
    }

    public function edit(Staff $staff)
    {
        $this->authorize('update', $staff);
        $roles = Role::where('id', '<>', 1)->get();
        return Inertia::render('Staff/Edit', [
            'staff' => $staff,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, Staff $staff)
    {
        $this->authorize('update', $staff);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:staff,email,' . $staff->id,
            'phone' => 'required|string|max:20',
            'role_id' => 'required|exists:roles,id',
        ]);

        $staff->update($validated);

        if ($staff->user) {
            $staff->user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
            ]);
            $staff->user->roles()->sync([$validated['role_id']]);
        }

        return redirect()->route('staff.index')->with('success', 'Staff member updated successfully.');
    }

    public function destroy(Staff $staff)
    {
        $this->authorize('delete', $staff);
        
        if ($staff->user) {
            $staff->user->delete();
        }
        
        $staff->delete();
        return redirect()->route('staff.index')->with('success', 'Staff member deleted successfully.');
    }
}