// Typed models for the Imgflip SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Free is the typed data model for the free entity.
type Free struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// FreeLoadMatch is the typed request payload for Free.LoadTyped.
type FreeLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// FreeCreateData is the typed request payload for Free.CreateTyped.
type FreeCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Premium is the typed data model for the premium entity.
type Premium struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PremiumCreateData is the typed request payload for Premium.CreateTyped.
type PremiumCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
