<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'headline',
        'bio',
        'phone',
        'location',
        'linkedin',
        'github',
        'website',
        'skills',
        'projects',
        'education',
        'experience',
        'languages',
    ];

    protected $casts = [
        'skills' => 'array',
        'projects' => 'array',
        'education' => 'array',
        'experience' => 'array',
        'languages' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}