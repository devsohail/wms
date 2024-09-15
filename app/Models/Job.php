<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_number', 'job_date', 'job_nature', 'client_name', 'vehicle_id',
        'ctrn_number', 'seal_number', 'storage_price',
        'storage_rate', 'handling_in_price', 'labour_contractor_id',
        'lifter_contractor_id', 'repacking', 'comment', 'remarks',
        'image', 'commodity', 'handling_out_charges',
        'authorized_gate_pass_name', 'paid_amount', 'labour_id',
        'material_used', 'payment', 'storage_in_job_number',
        'is_draft', 'is_finalized', 'user_id'
    ];

    protected $casts = [
        'job_date' => 'date',
        'repacking' => 'boolean',
        'is_draft' => 'boolean',
        'is_finalized' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function labourContractor()
    {
        return $this->belongsTo(User::class, 'labour_contractor_id');
    }

    public function lifterContractor()
    {
        return $this->belongsTo(User::class, 'lifter_contractor_id');
    }

    public function labour()
    {
        return $this->belongsTo(User::class, 'labour_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'client_name');
    }
}