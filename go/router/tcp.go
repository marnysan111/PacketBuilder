package router

import (
	"PacketBuilder/packet/handler"
	"PacketBuilder/packet/status"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SYN(r *gin.Context) {
	var data status.SYN
	r.BindJSON(&data)
	fmt.Println(data)
	var err error
	for i := 0; i < data.Times; i++ {
		err = handler.SendSYN(data.Device, data.SrcMac, data.DstMac, data.SrcIP, data.DstIP, uint16(data.SrcPort), uint16(data.DstPort), int64(data.Timeout))
		if err != nil {
			i = data.Times
		}
	}
	if err != nil {
		fmt.Println(err)
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"srcIP":   data.SrcIP,
			"result":  "failure",
			"err":     err,
		})
	} else {
		r.JSON(http.StatusOK, gin.H{
			"message": "送信に成功しました",
			"srcIP":   data.SrcIP,
			"result":  "success",
			"err":     "",
		})
	}

}

func HTTP(r *gin.Context) {
	var data status.HTTP
	r.BindJSON(&data)
	var err error
	for i := 0; i < data.Times; i++ {
		err = handler.SendHTTP(data.Methods, data.SrcIP, data.Port)
		if err != nil {
			i = data.Times
		}
	}
	if err != nil {
		fmt.Println(err)
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"srcIP":   data.SrcIP,
			"result":  "failure",
			"err":     err,
		})
	} else {
		r.JSON(http.StatusOK, gin.H{
			"message": "送信に成功しました",
			"srcIP":   data.SrcIP,
			"result":  "success",
			"err":     "",
		})
	}
}

func TCP(r *gin.Context) {

}
