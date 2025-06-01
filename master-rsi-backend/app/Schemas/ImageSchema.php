<?php

namespace App\Schemas;

/**
 * @OA\Schema(
 *     schema="Image",
 *     type="object",
 *     title="Image",
 *     required={"id","name","type","size"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="profile"),
 *     @OA\Property(property="type", type="string", example="jpeg"),
 *     @OA\Property(property="size", type="integer", example=1024),
 *     @OA\Property(property="url", type="string", description="Base64 encoded image")
 * )
 */
class ImageSchema
{
}