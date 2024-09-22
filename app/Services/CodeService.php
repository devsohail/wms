<?php

namespace App\Services;

use App\Models\Code;

class CodeService
{
    public function generateNextCode()
    {
        $lastCode = Code::max('code');
        return $this->incrementCode($lastCode ?: '1200');
    }

    public function incrementCode($code)
    {
        $numeric = intval($code);
        return str_pad($numeric + 1, 4, '0', STR_PAD_LEFT);
    }

    public function assignCode($entity, $code = null)
    {
        if (!$code) {
            $code = $this->generateNextCode();
        }

        while (Code::where('code', $code)->exists()) {
            $code = $this->incrementCode($code);
        }

        return Code::create([
            'code' => $code,
            'entity_type' => get_class($entity),
            'entity_id' => $entity->id,
        ]);
    }
}