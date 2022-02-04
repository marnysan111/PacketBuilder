package router

import (
	"PacketBuilder/packet/handler"
	"PacketBuilder/packet/status"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func TCP(r *gin.Context) {
	var tcp status.TCP
	r.BindJSON(&tcp)
	fmt.Println(tcp)
	var err error
	for i := 0; i < tcp.Times; i++ {
		err = handler.SendTCP(tcp.Device, tcp.SrcMac, tcp.DstMac, tcp.SrcIP, tcp.DstIP, uint16(tcp.SrcPort), uint16(tcp.DstPort), int64(tcp.Timeout))
		if err != nil {
			i = tcp.Times
		}
	}
	if err != nil {
		fmt.Println(err)
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"srcIP":   tcp.SrcIP,
			"result":  "failure",
			"err":     err,
		})
	} else {
		r.JSON(http.StatusOK, gin.H{
			"message": "送信に成功しました",
			"srcIP":   tcp.SrcIP,
			"result":  "success",
			"err":     "",
		})
	}

}
