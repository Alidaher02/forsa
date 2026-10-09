<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SessionsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionsController extends Controller
{
    public function store(SessionsRequest $request)
    {
        $data = $request->validated();

        if(! Auth::attempt($data)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }
        $user = Auth::user();

        $token = $user->createToken('auth')->plainTextToken;

        return response()->json([
            'message' => 'Credentials are valid.',
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Token deleted successfully.',
        ], 200);
    }
}
