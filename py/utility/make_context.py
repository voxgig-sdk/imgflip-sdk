# Imgflip SDK utility: make_context

from core.context import ImgflipContext


def make_context_util(ctxmap, basectx):
    return ImgflipContext(ctxmap, basectx)
