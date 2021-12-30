package router

import (
	"PacketBuilder/packet/handler"
	"PacketBuilder/packet/status"
	"fmt"

	"github.com/gin-gonic/gin"
)

func TCP(r *gin.Context) {
	var tcp status.TCP
	r.BindJSON(&tcp)
	fmt.Println(tcp)

	err := handler.SendTCP(tcp.Device, tcp.SrcMac, tcp.DstMac, tcp.SrcIP, tcp.DstIP, tcp.SrcPort, tcp.DstPort)
	if err != nil {
		fmt.Println(err)
		r.JSON(200, gin.H{
			"result": "failure",
			"err":    err,
		})
	} else {
		r.JSON(200, gin.H{
			"result": "success",
		})
	}

}
