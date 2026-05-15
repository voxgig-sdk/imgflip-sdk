package core

type ImgflipError struct {
	IsImgflipError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewImgflipError(code string, msg string, ctx *Context) *ImgflipError {
	return &ImgflipError{
		IsImgflipError: true,
		Sdk:              "Imgflip",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ImgflipError) Error() string {
	return e.Msg
}
