<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with(['role'])->where('id', '<>', 1)->paginate(10);
        $activeUsers = User::where('status', '1')->where('role_id', '<>', 1)->count();
        $inactiveUsers = User::where('status', '0')->where('role_id', '<>', 1)->count();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'activeUsers' => $activeUsers,
            'inactiveUsers' => $inactiveUsers,
        ])->with('flash', [
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        $roles = Role::where('id', '<>', 1)->get();
        return Inertia::render('Users/createUser', compact('roles'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|exists:roles,id',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        $roles = Role::where('id', '<>', 1)->get();
        return Inertia::render('Users/editUser', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role_id' => 'required|exists:roles,id',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
