<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function index()
    {
        return response()->json(Image::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $image = $request->file('image');
            $originalName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $sanitizedName = substr(preg_replace('/[^a-zA-Z0-9-_\.]/', '_', $originalName), 0, 20);

            $fullType = $image->getClientMimeType();
            $shortType = explode('/', $fullType)[1] ?? 'image'; // Gets just the subtype (e.g., 'png' from 'image/png')


            $storedImage = Image::create([
                'name' => $sanitizedName,
                'type' => $shortType,
                'size' => $image->getSize(),
                'bin_img' => base64_encode(file_get_contents($image))
            ]);

            return response()->json([
                'success' => true,
                'image' => $storedImage
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Image upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/images/{id}",
     *     summary="Delete an image",
     *     tags={"Images"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the image to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Image deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Image not found"
     *     )
     * )
     */
    public function destroy(Image $image)
    {
        try {
            $image->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}