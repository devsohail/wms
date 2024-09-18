<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'sales_agent_id',
        'name',
        'email',
        'phone',
        'address',
        'ship_to_name',
        'ship_to_email',
        'ship_to_phone',
        'ship_to_address',
        'user_id',
    ];

    public function salesAgent()
    {
        return $this->belongsTo(Staff::class, 'sales_agent_id');
    }

    // Add this if you need a user relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
