<?php
declare(strict_types=1);

// Imgflip SDK utility: prepare_body

class ImgflipPrepareBody
{
    public static function call(ImgflipContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
