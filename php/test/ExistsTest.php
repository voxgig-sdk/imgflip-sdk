<?php
declare(strict_types=1);

// Imgflip SDK exists test

require_once __DIR__ . '/../imgflip_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ImgflipSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
