<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Models\User;
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
        //Gate::authorize('SuperAdmin');
        $role_id = Auth::user()->role_id;
        $clinic_id = Auth::user()->clinic_id;
        $user_id = Auth::user()->user_id;

        if ($request->ajax()) {

            $users = User::where('role_id', '<>', 1);
            if ($request->filled('role_id')) {
                $users->where('role_id', $request->role_id);
            }
                        
            $users = $users->orderBy('id', 'DESC')->get();
            return DataTables::of($users)
                ->addColumn('serial_number', function () use (&$counter) {
                    return ++$counter;
                })
                ->addColumn('clinic_name', function ($user) {
                    return $user->getClinic->clinic_name ?? ''; 
                })
                ->addColumn('role_name', function ($user) {
                    return $user->getRole->name ?? '';
                })
                ->addColumn('action', function ($user) {
                
                    $action = '<div class="d-flex align-items-center">
                                    <button type="button" class="btn btn-icon btn-label-success btn-sm btn-icon m-1 editButton"
                                    data-bs-toggle="tooltip" title="Edit Detail" data-id="' . $user->id . '">
                                    <i class="fa fa-pen"></i>
                                    </button>
                                    <a href="javascript:;" class="btn btn-icon btn-label-danger btn-sm btn-icon m-1 delete"
                                    data-bs-toggle="tooltip" title="Delete Record" data-id="' . $user->id . '">
                                    <i class="fa fa-trash"></i>
                                    </a>
                                </div>';
                    return $action;
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        $data['activeUsers'] = User::where('status', '1')->where('role_id', '<>', 1)->count();
        $data['inactiveUsers'] = User::where('status', '0')->where('role_id', '<>', 1)->count();
        return Inertia::render('Users/Index', compact('data'));
    }

    /* Store a newly created resource in storage.*/
    public function store(Request $request)
    {
        Gate::authorize('AllAdmin');
        // Start a database transaction
        DB::beginTransaction();

        try {
                $data = $request->all();
                if ($file = $request->file('photo')) {
                    $fileName = $this->uploadFile($file);
                    $data['photo'] = $fileName;
                }
                $data['password'] = Hash::make($request->password);
                $user = User::create($data);
                DB::commit(); 
                return redirect('/user')->with(['message' => 'User created successfully', 'color' => 'green']);
            } catch (\Exception $e) {
                // Rollback the database transaction if there was an exception
                DB::rollBack();
                return redirect('/user')->with(['message' => 'Error while creating user. Please try again.'. $e->getMessage() , 'color' => 'red']);
            }
    }
    public function show($id)
    {
        Gate::authorize('AllAdmin');
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'Employee not found'], 404);
            }
            if ($user->photo == '') {
                $user->photo = asset('assets/auth/images/avatars/avatar1.avif');
            } else {
                $user->photo = asset('storage/auth/employees/' . $user->photo);
            }

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function destroy($id)
    {
        Gate::authorize('AllAdmin');
        try {
            $user = User::findOrFail($id); // Find the patient by its ID
            $user->delete(); // Delete the patient
            return response()->json([
                "message" => "Employee Deleted Successfully"
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function edit($id)
    {
        $user = User::find($id);
        if ($user->photo == '') {
            $user->photo = asset('assets/auth/images/avatars/avatar1.avif');
        } else {
            $user->photo = asset('storage/auth/employees/' . $user->photo);
        }
        if (!$user) {
            abort(404);
        }
        return response()->json($user);
    }
    public function update(Request $request,$id)
    {
        Gate::authorize('AllAdmin');
        $data = $request->all();
        $user = User::findOrFail($id);
        $oldImage = $user->image;

        if ($request->hasFile('photo')) {
            $path = public_path('storage/auth/employees');

            // Upload new file
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $filename);

            // Update the table with the new filename
            $data['image'] = $filename;

            // Delete the old image file
            if ($oldImage && file_exists($path . '/' . $oldImage)) {
                unlink($path . '/' . $oldImage);
            }
        }
        // Check if password is not empty before updating
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']); // Remove password from update data
        }
        $user->update($data);
        if ($user) {
            return response()->json(['message' => 'Data updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Data update failed'], 500);
        }
    }
    private function uploadFile($file)
    {
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filepath = public_path('storage/auth/employees');
        $file->move($filepath, $fileName);
        return $fileName;
    }
}
