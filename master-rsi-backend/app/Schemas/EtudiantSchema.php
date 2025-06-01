<?php

namespace App\Schemas;

/**
 * @OA\Schema(
 *     schema="Etudiant",
 *     type="object",
 *     title="Student",
 *     required={"id","login","nom"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="login", type="string", example="john_doe"),
 *     @OA\Property(property="nom", type="string", example="John Doe"),
 *     @OA\Property(property="note1", type="integer", example=15),
 *     @OA\Property(property="note2", type="integer", example=18),
 *     @OA\Property(property="moyenne", type="number", format="float", example=16.5),
 *     @OA\Property(property="longitude", type="number", format="float", example=-6.8498),
 *     @OA\Property(property="latitude", type="number", format="float", example=31.7917)
 * )
 */
class EtudiantSchema
{
}