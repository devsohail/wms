<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'parent_id'];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('exclude_admin_and_deleted', function (Builder $builder) {
            $builder->whereNotIn('name', ['admin'])
                    ->whereNull('deleted_at');
        });
    }

    public function parent()
    {
        return $this->belongsTo(Role::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Role::class, 'parent_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    // Method to get all roles including admin and soft-deleted
    public static function getAllRoles()
    {
        return static::withoutGlobalScope('exclude_admin_and_deleted')->get();
    }
}