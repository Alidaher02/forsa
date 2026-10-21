<?php

namespace App\Http\Controllers\Resume;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResumeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ResumeController extends Controller
{
    public function store(StoreResumeRequest $request)
    {
        $user = $request->user();

        if ($user->resumes()->exists()) {
            return response()->json([
                'error' => 'You already have a CV.',
            ], 409);
        }

        $file = $request->file('resume');
        $disk = 'private';

        $path = $file->store('resumes', $disk);

        if ($path === false) {
            return response()->json([
                'error' => 'Failed to store the uploaded file.',
            ], 500);
        }

        try {
            $resume = $user->resumes()->create([
                'original_filename' => $file->getClientOriginalName(),
                'disk' => $disk,
                'file_path' => $path,
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'status' => 'pending',
            ]);
        } catch (\Throwable $e) {
            Storage::disk($disk)->delete($path);

            throw $e;
        }

        return response()->json([
            'message' => 'Your CV has been uploaded.',
            'resume' => $resume,
        ], 201);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $resume = $user->resumes()->firstOrFail();

        $disk = $resume->disk;
        $path = $resume->file_path;

        if (!Storage::disk($disk)->exists($path)) {
            Log::warning('Resume file missing during deletion.', [
                'resume_id' => $resume->id,
                'user_id' => $user->id,
            ]);

            return response()->json([
                'error' => 'The CV file could not be found.',
            ], 500);
        }

        if (!Storage::disk($disk)->delete($path)) {
            return response()->json([
                'error' => 'Failed to delete the CV file.',
            ], 500);
        }

        $resume->delete();

        return response()->json([
            'message' => 'Your CV has been deleted.',
        ], 200);
    }
}
