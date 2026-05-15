<?php
declare(strict_types=1);

// Imgflip SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ImgflipMakeContext
{
    public static function call(array $ctxmap, ?ImgflipContext $basectx): ImgflipContext
    {
        return new ImgflipContext($ctxmap, $basectx);
    }
}
