
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();

            // One CV per user
            $table->foreignId('user_id')
                ->unique()
                ->constrained()
                ->cascadeOnDelete();

            // Original uploaded CV
            $table->string('original_filename');
            $table->string('disk')->default('private');
            $table->string('file_path');
            $table->string('mime_type', 100);
            $table->unsignedBigInteger('file_size')->nullable();

            // Extracted CV content
            $table->longText('parsed_text')->nullable();
            $table->json('parsed_data')->nullable();

            // pending, processing, completed, failed
            $table->string('status', 20)->default('pending');

            $table->text('parsing_error')->nullable();
            $table->timestamp('parsed_at')->nullable();

            $table->timestamps();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
