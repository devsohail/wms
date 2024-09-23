<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
class Job extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'job_number', 'job_date', 'customer_id', 'commodity', 'cntr_seal_no',
        'vehicle_id', 'weight_slip_no', 'storage_type', 'supervisor_sign',
        'vehicle_in', 'vehicle_out', 'bags_cartons', 'pallets',
        'labour_contractor_id', 'labors_count', 'labor_start_time',
        'labor_end_time', 'lifter_contractor_id', 'lifter_start_time', 'lifter_end_time',
        'is_draft','user_id', 'is_finalized'
    ];

    protected $casts = [
        'job_date' => 'date',
        'vehicle_in' => 'datetime',
        'vehicle_out' => 'datetime',
        'labor_start_time' => 'datetime',
        'labor_end_time' => 'datetime',
        'lifter_start_time' => 'datetime',
        'lifter_end_time' => 'datetime',
        'is_draft' => 'boolean',
        'is_finalized' => 'boolean',
    ];

    // Relationships
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function laborContractor()
    {
        return $this->belongsTo(Staff::class, 'labor_contractor_id');
    }

    public function lifter()
    {
        return $this->belongsTo(Staff::class, 'lifter_contractor_id');
    }
   // Add accessor for vehicle_in
    public function getVehicleInAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A');
    }

    // Add accessor for vehicle_out
    public function getVehicleOutAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A');
    }

    // Add accessor for labor_start_time
    public function getLaborStartTimeAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A');
    }

    // Add accessor for labor_end_time
    public function getLaborEndTimeAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A');
    }

    // Add accessor for lifter_start_time
    public function getLifterStartTimeAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A');
    }

    // Add accessor for lifter_end_time
    public function getLifterEndTimeAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A');
    }

}