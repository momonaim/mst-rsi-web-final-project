<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function submit(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'quiz' => 'required|string|in:javascript,php',
            'score' => 'required|integer|min:0|max:20',
        ]);

        // Get authenticated student
        $etudiant = Auth::user();
        if (!$etudiant) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Update the appropriate note based on quiz type
        if ($validated['quiz'] === 'javascript') {
            $etudiant->note1 = $validated['score'];
        } elseif ($validated['quiz'] === 'php') {
            $etudiant->note2 = $validated['score'];
        }

        // Save changes (moyenne will be automatically calculated thanks to the boot method in Etudiant model)
        $etudiant->save();

        return response()->json([
            'message' => 'Score saved successfully',
            'note1' => $etudiant->note1,
            'note2' => $etudiant->note2,
            'moyenne' => $etudiant->moyenne
        ]);
    }
}