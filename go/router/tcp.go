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
	var err1 error
	var err2 error
	channel1 := make(chan error)
	channel2 := make(chan error)
	fmt.Println(data.Device, data.SrcMac, data.DstMac, data.SrcIP, data.DstIP, uint16(data.SrcPort), uint16(data.DstPort), int64(data.Timeout), data.Times/2)
	go handler.SendSYN(data.Device, data.SrcMac, data.DstMac, data.SrcIP, data.DstIP, uint16(data.SrcPort), uint16(data.DstPort), int64(data.Timeout), data.Times, channel1)
	go handler.SendSYN(data.Device, data.SrcMac, data.DstMac, data.SrcIP, data.DstIP, uint16(data.SrcPort), uint16(data.DstPort), int64(data.Timeout), data.Times, channel2)
	err1 = <-channel1
	err2 = <-channel2
	fmt.Println(err1, err2)
	if err1 != nil {
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"dstIP":   data.DstIP,
			"result":  "failure",
			"err":     err1,
			"times":   data.Times,
			"type":    data.Type,
		})
	} else if err2 != nil {
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"dstIP":   data.DstIP,
			"result":  "failure",
			"err":     err2,
			"times":   data.Times,
			"type":    data.Type,
		})
	} else {
		r.JSON(http.StatusOK, gin.H{
			"message": "送信に成功しました",
			"dstIP":   data.DstIP,
			"result":  "success",
			"err":     "",
			"times":   data.Times,
			"type":    data.Type,
		})
	}

}

func HTTP(r *gin.Context) {
	var data status.HTTP
	r.BindJSON(&data)
	var err error
	for i := 0; i < data.Times; i++ {
		err = handler.SendHTTP(data.Methods, data.DstIP, data.Port, data.Sleep)
		if err != nil {
			i = data.Times
		}
	}
	if err != nil {
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"dstIP":   data.DstIP,
			"result":  "failure",
			"err":     err,
			"times":   data.Times,
			"type":    data.Type,
		})
	} else {
		r.JSON(http.StatusOK, gin.H{
			"message": "送信に成功しました",
			"dstIP":   data.DstIP,
			"result":  "success",
			"err":     "",
			"times":   data.Times,
			"type":    data.Type,
		})
	}
}

func TCP(r *gin.Context) {
	var data status.TCP
	r.BindJSON(&data)
	var err error
	for i := 0; i < data.Times; i++ {
		err = handler.SendTCP(data.DstIP, data.Port, data.Sleep)
		if err != nil {
			i = data.Times
		}
	}
	if err != nil {
		r.JSON(401, gin.H{
			"message": "送信に失敗しました",
			"dstIP":   data.DstIP,
			"result":  "failure",
			"err":     err,
			"times":   data.Times,
			"type":    data.Type,
		})
	} else {
		r.JSON(http.StatusOK, gin.H{
			"message": "送信に成功しました",
			"dstIP":   data.DstIP,
			"result":  "success",
			"err":     "",
			"times":   data.Times,
			"type":    data.Type,
		})
	}
}
