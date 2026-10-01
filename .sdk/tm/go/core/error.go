package core

import "encoding/json"

type ImgflipError struct {
	IsImgflipError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
}

func NewImgflipError(code string, msg string, ctx *Context) *ImgflipError {
	return &ImgflipError{
		IsImgflipError: true,
		Sdk:                "Imgflip",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
	}
}

func (e *ImgflipError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *ImgflipError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *ImgflipError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
