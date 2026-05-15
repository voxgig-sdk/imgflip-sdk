<?php
declare(strict_types=1);

// Imgflip SDK utility: result_body

class ImgflipResultBody
{
    public static function call(ImgflipContext $ctx): ?ImgflipResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
