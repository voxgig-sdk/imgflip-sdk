<?php
declare(strict_types=1);

// Imgflip SDK utility: feature_add

class ImgflipFeatureAdd
{
    public static function call(ImgflipContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
