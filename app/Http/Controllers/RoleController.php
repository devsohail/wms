<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('parent')->get();
        return Inertia::render('Roles/Index', ['roles' => $roles]);
    }

    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Roles/Create', ['roles' => $roles]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'parent_id' => 'nullable|exists:roles,id',
        ]);
        $validated['guard_name'] = 'web';
        Role::create($validated);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    public function edit(Role $role)
    {
        $roles = Role::where('id', '!=', $role->id)->get();
        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'parent_id' => 'nullable|exists:roles,id',
        ]);

        $role->update($validated);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }
}