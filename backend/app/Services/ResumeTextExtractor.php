<?php

namespace App\Services;

use Smalot\PdfParser\Parser;

class ResumeTextExtractor
{

    public function extract($file)
    {
        $parser = new Parser(); 

        return $parser->parseFile($file->getRealPath())->getText();
    }

}
