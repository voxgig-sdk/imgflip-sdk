// Typed models for the Imgflip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Free {
  boxes?: any[]
  font?: string
  max_font_size?: number
  memes?: any[]
  no_watermark?: boolean
  password: string
  template_id: string
  text0?: string
  text1?: string
  username: string
}

export interface FreeLoadMatch {
  type?: string
}

export interface FreeCreateData {
  boxes?: any[]
  font?: string
  max_font_size?: number
  memes?: any[]
  no_watermark?: boolean
  password: string
  template_id: string
  text0?: string
  text1?: string
  username: string
}

export interface Premium {
  boxes: any[]
  font?: string
  include_nsfw?: number
  max_font_size?: number
  meme?: any
  memes?: any[]
  model?: string
  no_watermark?: boolean
  password: string
  prefix_text?: string
  query: string
  template_id?: string
  text: string
  type?: string
  username: string
}

export interface PremiumCreateData {
  boxes: any[]
  font?: string
  include_nsfw?: number
  max_font_size?: number
  meme?: any
  memes?: any[]
  model?: string
  no_watermark?: boolean
  password: string
  prefix_text?: string
  query: string
  template_id: string
  text: string
  type?: string
  username: string
}

