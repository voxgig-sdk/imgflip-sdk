# Typed models for the Imgflip SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class FreeRequired(TypedDict):
    password: str
    template_id: str
    username: str


class Free(FreeRequired, total=False):
    boxes: list
    font: str
    max_font_size: int
    memes: list
    no_watermark: bool
    text0: str
    text1: str


class FreeLoadMatch(TypedDict, total=False):
    type: str


class FreeCreateDataRequired(TypedDict):
    password: str
    template_id: str
    username: str


class FreeCreateData(FreeCreateDataRequired, total=False):
    boxes: list
    font: str
    max_font_size: int
    memes: list
    no_watermark: bool
    text0: str
    text1: str


class PremiumRequired(TypedDict):
    boxes: list
    password: str
    query: str
    text: str
    username: str


class Premium(PremiumRequired, total=False):
    font: str
    include_nsfw: int
    max_font_size: int
    meme: Any
    memes: list
    model: str
    no_watermark: bool
    prefix_text: str
    template_id: str
    type: str


class PremiumCreateDataRequired(TypedDict):
    boxes: list
    password: str
    query: str
    template_id: str
    text: str
    username: str


class PremiumCreateData(PremiumCreateDataRequired, total=False):
    font: str
    include_nsfw: int
    max_font_size: int
    meme: Any
    memes: list
    model: str
    no_watermark: bool
    prefix_text: str
    type: str
