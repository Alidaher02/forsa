<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreResumeRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only authenticated users can upload resumes.
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'resume' => [
                'required',
                'file',
                File::types(['pdf', 'docx'])->max(5 * 1024),
                'extensions:pdf,docx',
            ],

            'is_primary' => [
                'sometimes',
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'resume.required' => 'Please upload your CV.',
            'resume.file' => 'The uploaded CV must be a valid file.',
            'resume.extensions' => 'Your CV must have a PDF or DOCX extension.',
            'is_primary.boolean' => 'The primary CV flag must be true or false.',
        ];
    }

    public function attributes(): array
    {
        return [
            'resume' => 'CV',
            'is_primary' => 'primary CV setting',
        ];
    }
}
