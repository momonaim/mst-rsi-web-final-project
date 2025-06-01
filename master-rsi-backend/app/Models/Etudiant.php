<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Etudiant extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'etudiants';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login',
        'pass',
        'nom',
        'note1',
        'note2',
        'moyenne',
        'longitude',
        'latitude'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'pass',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'note1' => 'integer',
        'note2' => 'integer',
        'moyenne' => 'float',
        'longitude' => 'float',
        'latitude' => 'float'
    ];
    /**
     * Automatically calculate the average when notes are updated.
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->moyenne = ($model->note1 + $model->note2) / 2;
        });
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->pass;
    }
}
