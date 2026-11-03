// Typed models for the Imgflip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/imgflip-sdk/go/core"
)

// Free is the typed data model for the free entity.
type Free struct {
}

// FreeLoadMatch is the typed request payload for Free.LoadTyped.
type FreeLoadMatch struct {
	Type *string `json:"type,omitempty"`
}

// FreeCreateData is the typed request payload for Free.CreateTyped.
type FreeCreateData struct {
	Boxes *[]any `json:"boxes,omitempty"`
	Font *string `json:"font,omitempty"`
	MaxFontSize *int `json:"max_font_size,omitempty"`
	Memes *[]any `json:"memes,omitempty"`
	NoWatermark *bool `json:"no_watermark,omitempty"`
	Password string `json:"password"`
	TemplateId string `json:"template_id"`
	Text0 *string `json:"text0,omitempty"`
	Text1 *string `json:"text1,omitempty"`
	Username string `json:"username"`
}

// Premium is the typed data model for the premium entity.
type Premium struct {
}

// PremiumCreateData is the typed request payload for Premium.CreateTyped.
type PremiumCreateData struct {
	Boxes []any `json:"boxes"`
	Font *string `json:"font,omitempty"`
	IncludeNsfw *int `json:"include_nsfw,omitempty"`
	MaxFontSize *int `json:"max_font_size,omitempty"`
	Meme *any `json:"meme,omitempty"`
	Memes *[]any `json:"memes,omitempty"`
	Model *string `json:"model,omitempty"`
	NoWatermark *bool `json:"no_watermark,omitempty"`
	Password string `json:"password"`
	PrefixText *string `json:"prefix_text,omitempty"`
	Query string `json:"query"`
	TemplateId string `json:"template_id"`
	Text string `json:"text"`
	Type *string `json:"type,omitempty"`
	Username string `json:"username"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
