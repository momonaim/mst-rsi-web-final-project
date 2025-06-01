<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterBinImgColumnInImagesTable extends Migration
{
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->longText('bin_img')->charset('binary')->change(); // ou ->longBlob() si c'était blob
        });
    }

    public function down()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->longText('bin_img')->change(); // à adapter selon l'ancien type
        });
    }
}
