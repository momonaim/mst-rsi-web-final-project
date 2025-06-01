<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductControler;
use App\Http\Controllers\QuizController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Student routes
    Route::get('/etudiants', [EtudiantController::class, 'index']);
    Route::post('/etudiants', [EtudiantController::class, 'store']);
    Route::put('/etudiants/{etudiant}', [EtudiantController::class, 'update']);
    Route::get('/etudiants/{etudiant}', [EtudiantController::class, 'show']);
    Route::delete('/etudiants/{etudiant}', [EtudiantController::class, 'destroy']);

    // Image routes
    Route::get('/images', [ImageController::class, 'index']);
    Route::post('/images', [ImageController::class, 'store']);

    // Quiz routes
    Route::post('/quiz/submit', [QuizController::class, 'submit']);


    // Product routes
    Route::apiResource('products', ProductControler::class);
});
