<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Authenticate a student",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"login","pass"},
     *             @OA\Property(property="login", type="string", example="john_doe"),
     *             @OA\Property(property="pass", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful authentication",
     *         @OA\JsonContent(
     *             @OA\Property(property="access_token", type="string"),
     *             @OA\Property(property="token_type", type="string", example="Bearer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials"
     *     )
     * )
     */
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'pass' => 'required|string'
        ]);

        $etudiant = Etudiant::where('login', $request->login)->first();

        if (!$etudiant || !Hash::check($request->pass, $etudiant->pass)) {
            throw ValidationException::withMessages([
                'login' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $etudiant->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'etudiant' => $etudiant
        ]);
    }
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new student",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","login","pass","pass_confirmation"},
     *             @OA\Property(property="nom", type="string", example="John Doe", description="Student's full name"),
     *             @OA\Property(property="login", type="string", example="john_doe", description="Unique username"),
     *             @OA\Property(property="pass", type="string", format="password", example="password123", description="Password (min 8 chars)"),
     *             @OA\Property(property="pass_confirmation", type="string", format="password", example="password123", description="Password confirmation")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Student registered successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..."),
     *             @OA\Property(property="token_type", type="string", example="Bearer"),
     *             @OA\Property(property="etudiant", ref="#/components/schemas/Etudiant")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(
     *                     property="login",
     *                     type="array",
     *                     @OA\Items(type="string", example="The login has already been taken.")
     *                 ),
     *                 @OA\Property(
     *                     property="pass",
     *                     type="array",
     *                     @OA\Items(type="string", example="The pass confirmation does not match.")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:20',
            'login' => 'required|string|max:20|unique:etudiants',
            'pass' => 'required|string|min:8|confirmed',
        ]);

        $etudiant = Etudiant::create([
            'nom' => $validated['nom'],
            'login' => $validated['login'],
            'pass' => Hash::make($validated['pass']),
            'note1' => 0, // Default values
            'note2' => 0,
            'moyenne' => 0,
            'longitude' => 0,
            'latitude' => 0
        ]);

        $token = $etudiant->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'etudiant' => $etudiant
        ], 201);
    }
    public function me()
    {
        // Get the authenticated user data
        return response()->json(Auth::user());
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
