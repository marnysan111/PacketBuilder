package router

import (
	"PacketBuilder/packet/status"
	"fmt"

	"github.com/gin-gonic/gin"
)

func TCP(r *gin.Context) {
	var tcp status.TCP
	r.BindJSON(&tcp)

	fmt.Println(tcp)

	r.JSON(200, gin.H{
		"result": "SUCCESS",
	})
}
