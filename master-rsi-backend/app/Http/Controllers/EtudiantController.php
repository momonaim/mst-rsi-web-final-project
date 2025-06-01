<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class EtudiantController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/etudiants",
     *     summary="Get all students",
     *     tags={"Students"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of students",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Etudiant")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Etudiant::all());
    }

    public function show(int $id)
    {
        $etudiant = Etudiant::findOrFail($id);
        return response()->json($etudiant);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:20',
            'login' => 'required|string|max:20|unique:etudiants',
            'pass' => 'required|string|min:8',
            'note1' => 'required|integer',
            'note2' => 'required|integer',
            'longitude' => 'nullable|numeric',
            'latitude' => 'nullable|numeric'
        ]);

        $validated['pass'] = bcrypt($validated['pass']);
        $validated['moyenne'] = ($validated['note1'] + $validated['note2']) / 2;

        $etudiant = Etudiant::create($validated);

        // Save to file (additional requirement)
        $data = implode(',', $validated) . "\n";
        Storage::append('master_rsi2020.txt', $data);

        return response()->json($etudiant, 201);
    }

    public function update(Request $request, Etudiant $etudiant)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:20',
            'note1' => 'sometimes|integer',
            'note2' => 'sometimes|integer',
            'longitude' => 'nullable|numeric',
            'latitude' => 'nullable|numeric'
        ]);

        if (isset($validated['note1']) || isset($validated['note2'])) {
            $note1 = $validated['note1'] ?? $etudiant->note1;
            $note2 = $validated['note2'] ?? $etudiant->note2;
            $validated['moyenne'] = ($note1 + $note2) / 2;
        }

        $etudiant->update($validated);

        return response()->json($etudiant);
    }
    public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();
        return response()->json(null, 204);
    }
}