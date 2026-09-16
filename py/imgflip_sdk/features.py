# Imgflip SDK feature factory

from imgflip_sdk.feature.base_feature import ImgflipBaseFeature
from imgflip_sdk.feature.ratelimit_feature import ImgflipRatelimitFeature
from imgflip_sdk.feature.retry_feature import ImgflipRetryFeature
from imgflip_sdk.feature.test_feature import ImgflipTestFeature
from imgflip_sdk.feature.timeout_feature import ImgflipTimeoutFeature


_FEATURES = {
    "base": lambda: ImgflipBaseFeature(),
    "ratelimit": lambda: ImgflipRatelimitFeature(),
    "retry": lambda: ImgflipRetryFeature(),
    "test": lambda: ImgflipTestFeature(),
    "timeout": lambda: ImgflipTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
