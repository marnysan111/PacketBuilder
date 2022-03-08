package handler

import (
	"PacketBuilder/packet/status"
	"fmt"
	"math/rand"
	"net"
	"net/http"
	"time"

	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	"github.com/google/gopacket/pcap"
)

var (
	snaplen int32 = 1024
	promisc bool
	t       time.Duration
	buf     = gopacket.NewSerializeBuffer()
	opts    = gopacket.SerializeOptions{
		FixLengths:       true,
		ComputeChecksums: true,
	}
)

func SendSYN(device string, sMAC string, dMAC string, sIP string, dIP string, sPort uint16, dPort uint16, timeout int64, times int, c chan error) {
	srcMAC, err := net.ParseMAC(sMAC)
	if err != nil {
		c <- &status.MyError{Msg: "srcMac conversion error", Code: 30000}
	}
	dstMAC, err := net.ParseMAC(dMAC)
	if err != nil {
		c <- &status.MyError{Msg: "dstMac conversion error", Code: 30001}
	}

	eth := layers.Ethernet{
		SrcMAC:       srcMAC,
		DstMAC:       dstMAC,
		EthernetType: layers.EthernetTypeIPv4,
	}
	srcIP := net.ParseIP(sIP)
	dstIP := net.ParseIP(dIP)

	ipLayer := layers.IPv4{
		Version:  4,
		Length:   20,
		Protocol: 6,
		SrcIP:    srcIP,
		DstIP:    dstIP,
	}
	tcpLayer := layers.TCP{
		SrcPort:  layers.TCPPort(sPort),
		DstPort:  layers.TCPPort(dPort),
		SYN:      true,
		FIN:      false,
		RST:      false,
		URG:      false,
		PSH:      false,
		ACK:      false,
		Checksum: 0,
		Window:   512,
		Seq:      1,
	}

	tcpLayer.SetNetworkLayerForChecksum(&ipLayer)
	err = gopacket.SerializeLayers(buf, opts, &eth, &ipLayer, &tcpLayer)
	if err != nil {
		c <- &status.MyError{Msg: "SerializeLayers error", Code: 30002}
	}
	t = time.Duration(timeout) * time.Second
	h, err := pcap.OpenLive(device, snaplen, promisc, t)
	if err != nil {
		c <- &status.MyError{Msg: "OpenLive error", Code: 30003}
	}

	count := 0
	for i := 0; i < times/2; i++ {
		h.WritePacketData(buf.Bytes())
		count += 1
	}
	fmt.Println(count)
	h.Close()
	c <- nil
}

func SendTCP(dstIP string, dstPort string, sleep int) error {
	rand.Seed(time.Now().UnixNano())
	var sleepTime time.Duration = time.Duration(rand.Intn(sleep))
	time.Sleep(sleepTime * time.Second)
	conn, err := net.Dial("tcp", dstIP+":"+dstPort)
	if err != nil {
		return &status.MyError{Msg: "TCP connect error", Code: 30004}
	}
	defer conn.Close()
	return nil
}

func SendHTTP(method string, dstIP string, dstPort string, sleep int) error {
	rand.Seed(time.Now().UnixNano())
	var sleepTime time.Duration = time.Duration(rand.Intn(sleep))
	time.Sleep(sleepTime * time.Second)
	url := "http://" + dstIP + ":" + dstPort
	//fmt.Println(url)
	if method == "GET" {
		response, err := http.Get(url)
		if err != nil {
			fmt.Println(err)
			return &status.MyError{Msg: "HTTP connect error", Code: 30005}
		}
		defer response.Body.Close()

	} else if method == "POST" {
		response, err := http.Post(url, "", nil)
		if err != nil {
			fmt.Println(err)
			return &status.MyError{Msg: "HTTP connect error", Code: 30005}
		}
		defer response.Body.Close()

	}
	return nil
}
