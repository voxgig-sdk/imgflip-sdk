# Imgflip SDK feature factory

from imgflip_sdk.feature.base_feature import ImgflipBaseFeature
from imgflip_sdk.feature.test_feature import ImgflipTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ImgflipBaseFeature(),
        "test": lambda: ImgflipTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
