package status

import "fmt"

type MyError struct {
	Msg  string
	Code int
}

func (err *MyError) Error() string {
	return fmt.Sprintf("ERROR: %d %s", err.Code, err.Msg)
}
