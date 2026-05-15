# ProjectName SDK exists test

import pytest
from imgflip_sdk import ImgflipSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ImgflipSDK.test(None, None)
        assert testsdk is not None
