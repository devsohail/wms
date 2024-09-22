<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    protected $fillable = ['code', 'entity_type', 'entity_id'];

    public function entity()
    {
        return $this->morphTo();
    }
}
