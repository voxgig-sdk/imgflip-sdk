<?php
declare(strict_types=1);

// Imgflip SDK utility: result_headers

class ImgflipResultHeaders
{
    public static function call(ImgflipContext $ctx): ?ImgflipResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
