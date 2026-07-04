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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Free = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Match filter for Free#load (any subset of Free fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
FreeLoadMatch = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Match filter for Free#create (any subset of Free fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
FreeCreateData = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Premium entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Premium = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Match filter for Premium#create (any subset of Premium fields).
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PremiumCreateData = Struct.new(
  :data,
  :success,
  keyword_init: true
)

