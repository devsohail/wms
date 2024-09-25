<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Document;

class DocumentPolicy
{
    public function update(User $user, Document $document)
    {
        return $user->role_id === 1;
    }

    public function delete(User $user, Document $document)
    {
        return $user->role_id === 1;
    }
}