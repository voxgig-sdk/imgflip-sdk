# frozen_string_literal: true

# Typed models for the Imgflip SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Free entity data model.
#
# @!attribute [rw] memes
#   @return [Array, nil]
Free = Struct.new(
  :memes,
  keyword_init: true
)

# Request payload for Free#load.
#
# @!attribute [rw] memes
#   @return [Array, nil]
FreeLoadMatch = Struct.new(
  :memes,
  keyword_init: true
)

# Request payload for Free#create.
#
# @!attribute [rw] memes
#   @return [Array, nil]
FreeCreateData = Struct.new(
  :memes,
  keyword_init: true
)

# Premium entity data model.
#
# @!attribute [rw] meme
#   @return [Object, nil]
#
# @!attribute [rw] memes
#   @return [Array, nil]
Premium = Struct.new(
  :meme,
  :memes,
  keyword_init: true
)

# Request payload for Premium#create.
#
# @!attribute [rw] meme
#   @return [Object, nil]
#
# @!attribute [rw] memes
#   @return [Array, nil]
PremiumCreateData = Struct.new(
  :meme,
  :memes,
  keyword_init: true
)

