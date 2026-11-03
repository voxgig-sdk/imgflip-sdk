# frozen_string_literal: true

# Typed models for the Imgflip SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Free entity data model.
#
# @!attribute [rw] boxes
#   @return [Array, nil]
#
# @!attribute [rw] font
#   @return [String, nil]
#
# @!attribute [rw] max_font_size
#   @return [Integer, nil]
#
# @!attribute [rw] memes
#   @return [Array, nil]
#
# @!attribute [rw] no_watermark
#   @return [Boolean, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] text0
#   @return [String, nil]
#
# @!attribute [rw] text1
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
Free = Struct.new(
  :boxes,
  :font,
  :max_font_size,
  :memes,
  :no_watermark,
  :password,
  :template_id,
  :text0,
  :text1,
  :username,
  keyword_init: true
)

# Request payload for Free#load.
#
# @!attribute [rw] type
#   @return [String, nil]
FreeLoadMatch = Struct.new(
  :type,
  keyword_init: true
)

# Request payload for Free#create.
#
# @!attribute [rw] boxes
#   @return [Array, nil]
#
# @!attribute [rw] font
#   @return [String, nil]
#
# @!attribute [rw] max_font_size
#   @return [Integer, nil]
#
# @!attribute [rw] memes
#   @return [Array, nil]
#
# @!attribute [rw] no_watermark
#   @return [Boolean, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] text0
#   @return [String, nil]
#
# @!attribute [rw] text1
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
FreeCreateData = Struct.new(
  :boxes,
  :font,
  :max_font_size,
  :memes,
  :no_watermark,
  :password,
  :template_id,
  :text0,
  :text1,
  :username,
  keyword_init: true
)

# Premium entity data model.
#
# @!attribute [rw] boxes
#   @return [Array]
#
# @!attribute [rw] font
#   @return [String, nil]
#
# @!attribute [rw] include_nsfw
#   @return [Integer, nil]
#
# @!attribute [rw] max_font_size
#   @return [Integer, nil]
#
# @!attribute [rw] meme
#   @return [Object, nil]
#
# @!attribute [rw] memes
#   @return [Array, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] no_watermark
#   @return [Boolean, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] prefix_text
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
Premium = Struct.new(
  :boxes,
  :font,
  :include_nsfw,
  :max_font_size,
  :meme,
  :memes,
  :model,
  :no_watermark,
  :password,
  :prefix_text,
  :query,
  :template_id,
  :text,
  :type,
  :username,
  keyword_init: true
)

# Request payload for Premium#create.
#
# @!attribute [rw] boxes
#   @return [Array]
#
# @!attribute [rw] font
#   @return [String, nil]
#
# @!attribute [rw] include_nsfw
#   @return [Integer, nil]
#
# @!attribute [rw] max_font_size
#   @return [Integer, nil]
#
# @!attribute [rw] meme
#   @return [Object, nil]
#
# @!attribute [rw] memes
#   @return [Array, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] no_watermark
#   @return [Boolean, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] prefix_text
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
PremiumCreateData = Struct.new(
  :boxes,
  :font,
  :include_nsfw,
  :max_font_size,
  :meme,
  :memes,
  :model,
  :no_watermark,
  :password,
  :prefix_text,
  :query,
  :template_id,
  :text,
  :type,
  :username,
  keyword_init: true
)

