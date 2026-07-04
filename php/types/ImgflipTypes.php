<?php
declare(strict_types=1);

// Typed models for the Imgflip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Free entity data model. */
class Free
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Match filter for Free#load (any subset of Free fields). */
class FreeLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Match filter for Free#create (any subset of Free fields). */
class FreeCreateData
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Premium entity data model. */
class Premium
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Match filter for Premium#create (any subset of Premium fields). */
class PremiumCreateData
{
    public ?array $data = null;
    public ?bool $success = null;
}

