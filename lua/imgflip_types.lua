-- Typed models for the Imgflip SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Free
---@field boxes? table
---@field font? string
---@field max_font_size? number
---@field memes? table
---@field no_watermark? boolean
---@field password string
---@field template_id string
---@field text0? string
---@field text1? string
---@field username string

---@class FreeLoadMatch
---@field type? string

---@class FreeCreateData
---@field boxes? table
---@field font? string
---@field max_font_size? number
---@field memes? table
---@field no_watermark? boolean
---@field password string
---@field template_id string
---@field text0? string
---@field text1? string
---@field username string

---@class Premium
---@field boxes table
---@field font? string
---@field include_nsfw? number
---@field max_font_size? number
---@field meme? any
---@field memes? table
---@field model? string
---@field no_watermark? boolean
---@field password string
---@field prefix_text? string
---@field query string
---@field template_id? string
---@field text string
---@field type? string
---@field username string

---@class PremiumCreateData
---@field boxes table
---@field font? string
---@field include_nsfw? number
---@field max_font_size? number
---@field meme? any
---@field memes? table
---@field model? string
---@field no_watermark? boolean
---@field password string
---@field prefix_text? string
---@field query string
---@field template_id string
---@field text string
---@field type? string
---@field username string

local M = {}

return M
