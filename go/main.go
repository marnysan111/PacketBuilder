package main

import (
	"PacketBuilder/packet/router"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://192.168.56.20:3000",
			"http://192.168.1.21:3000",
			"http://localhost:3000",
		},
		AllowMethods: []string{
			"POST",
			"GET",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
	}))
	r.GET("/device", router.Device)
	r.POST("/tcp", router.TCP)
	r.POST("/http", router.HTTP)
	r.POST("/syn", router.SYN)
	r.Run(":80")
}
