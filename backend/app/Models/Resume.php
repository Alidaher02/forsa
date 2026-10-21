<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'original_filename',
        'disk',
        'file_path',
        'mime_type',
        'file_size',
        'parsed_text',
        'parsed_data',
        'status',
        'parsing_error',
        'parsed_at',
        'is_primary',
    ];

    protected function casts(): array
    {
        return [
            'parsed_data' => 'array',
            'file_size' => 'integer',
            'parsed_at' => 'datetime',
            'is_primary' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
