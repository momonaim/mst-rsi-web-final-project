<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Save student data to a text file
     *
     * @param Request $request Request containing student data
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveStudentsToFile(Request $request)
    {
        try {
            $data = $request->validate([
                'students' => 'required|array',
                'students.*.cne' => 'required|string',
                'students.*.nom' => 'required|string',
                'students.*.prenom' => 'required|string',
                'students.*.module1' => 'required|numeric',
                'students.*.module2' => 'required|numeric',
                'students.*.module3' => 'required|numeric',
            ]);

            $filePath = storage_path('app/master_rsi2025.txt');



            // Create header line
            $content = "CNE\tNom\tPrénom\tModule 1\tModule 2\tModule 3\n";

            if (!file_exists($filePath)) {
                // Create directory if it doesn't exist
                $directory = dirname($filePath);
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }

                // Create empty file with headers
                file_put_contents($filePath, data: $content);
            }

            // Add each student data
            foreach ($data['students'] as $student) {
                $content .= implode("\t", [
                    $student['cne'],
                    $student['nom'],
                    $student['prenom'],
                    $student['module1'],
                    $student['module2'],
                    $student['module3']
                ]) . "\n";
            }

            // Save the file
            if (!file_put_contents($filePath, $content)) {
                throw new \Exception('Unable to save the file');
            }

            return response()->json([
                'message' => 'File saved successfully',
                'path' => $filePath
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Load student data from the text file
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function loadStudentsFromFile()
    {
        try {
            $filePath = storage_path('app/master_rsi2025.txt');



            $content = file_get_contents($filePath);
            $lines = explode("\n", $content);

            // Remove header line and empty lines
            array_shift($lines);
            $lines = array_filter($lines);

            $students = [];
            foreach ($lines as $line) {
                $data = explode("\t", $line);
                if (count($data) === 6) { // Ensure we have all fields
                    $students[] = [
                        'cne' => $data[0],
                        'nom' => $data[1],
                        'prenom' => $data[2],
                        'module1' => floatval($data[3]),
                        'module2' => floatval($data[4]),
                        'module3' => floatval($data[5])
                    ];
                }
            }

            return response()->json([
                'students' => $students
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
