<?php
declare(strict_types=1);

// Imgflip SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ImgflipFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ImgflipBaseFeature();
            case "test":
                return new ImgflipTestFeature();
            default:
                return new ImgflipBaseFeature();
        }
    }
}
