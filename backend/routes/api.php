<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\SessionsController;
use App\Http\Controllers\Resume\ResumeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [SessionsController::class, 'store']);


Route::middleware('auth:sanctum')->group(function () {    
    Route::get('/user', function (Request $request) {
    return $request->user();
    }); 

    Route::delete('/logout', [SessionsController::class, 'destroy']);

    Route::post('/resumes/store', [ResumeController::class, 'store']);
    Route::delete('/resumes/destroy', [ResumeController::class, 'destroy']);
});