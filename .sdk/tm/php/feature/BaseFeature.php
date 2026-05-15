<?php
declare(strict_types=1);

// Imgflip SDK base feature

class ImgflipBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ImgflipContext $ctx, array $options): void {}
    public function PostConstruct(ImgflipContext $ctx): void {}
    public function PostConstructEntity(ImgflipContext $ctx): void {}
    public function SetData(ImgflipContext $ctx): void {}
    public function GetData(ImgflipContext $ctx): void {}
    public function GetMatch(ImgflipContext $ctx): void {}
    public function SetMatch(ImgflipContext $ctx): void {}
    public function PrePoint(ImgflipContext $ctx): void {}
    public function PreSpec(ImgflipContext $ctx): void {}
    public function PreRequest(ImgflipContext $ctx): void {}
    public function PreResponse(ImgflipContext $ctx): void {}
    public function PreResult(ImgflipContext $ctx): void {}
    public function PreDone(ImgflipContext $ctx): void {}
    public function PreUnexpected(ImgflipContext $ctx): void {}
}
