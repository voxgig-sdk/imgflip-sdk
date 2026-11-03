<?php
declare(strict_types=1);

// Typed models for the Imgflip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Free entity data model. */
class Free
{
    public ?array $boxes = null;
    public ?string $font = null;
    public ?int $max_font_size = null;
    public ?array $memes = null;
    public ?bool $no_watermark = null;
    public string $password;
    public string $template_id;
    public ?string $text0 = null;
    public ?string $text1 = null;
    public string $username;
}

/** Request payload for Free#load. */
class FreeLoadMatch
{
    public ?string $type = null;
}

/** Request payload for Free#create. */
class FreeCreateData
{
    public ?array $boxes = null;
    public ?string $font = null;
    public ?int $max_font_size = null;
    public ?array $memes = null;
    public ?bool $no_watermark = null;
    public string $password;
    public string $template_id;
    public ?string $text0 = null;
    public ?string $text1 = null;
    public string $username;
}

/** Premium entity data model. */
class Premium
{
    public array $boxes;
    public ?string $font = null;
    public ?int $include_nsfw = null;
    public ?int $max_font_size = null;
    public mixed $meme = null;
    public ?array $memes = null;
    public ?string $model = null;
    public ?bool $no_watermark = null;
    public string $password;
    public ?string $prefix_text = null;
    public string $query;
    public ?string $template_id = null;
    public string $text;
    public ?string $type = null;
    public string $username;
}

/** Request payload for Premium#create. */
class PremiumCreateData
{
    public array $boxes;
    public ?string $font = null;
    public ?int $include_nsfw = null;
    public ?int $max_font_size = null;
    public mixed $meme = null;
    public ?array $memes = null;
    public ?string $model = null;
    public ?bool $no_watermark = null;
    public string $password;
    public ?string $prefix_text = null;
    public string $query;
    public string $template_id;
    public string $text;
    public ?string $type = null;
    public string $username;
}

