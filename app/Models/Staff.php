<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'role_id',
        'code', 'bank_id', 'iban', 'account_number'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }
    
}