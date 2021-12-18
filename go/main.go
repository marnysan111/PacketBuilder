package main

import (
	"PacketBuilder/packet/router"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.POST("/tcp", router.TCP)
	r.Run(":80")
}
