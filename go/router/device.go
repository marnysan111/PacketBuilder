package router

import (
	"PacketBuilder/packet/handler"

	"github.com/gin-gonic/gin"
)

func Device(r *gin.Context) {
	devices, err := handler.GetDevice()
	if err != nil {
		r.JSON(200, gin.H{
			"result": "failure",
			"err":    err,
		})
	} else {
		r.JSON(200, gin.H{
			"result":  "success",
			"devices": devices,
		})
	}

}
