// Typed models for the Imgflip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Free {
  data?: Record<string, any>
  success?: boolean
}

export type FreeLoadMatch = Partial<Free>

export type FreeCreateData = Partial<Free>

export interface Premium {
  data?: Record<string, any>
  success?: boolean
}

export type PremiumCreateData = Partial<Premium>

