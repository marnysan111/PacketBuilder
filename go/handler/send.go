package handler

import (
	"PacketBuilder/packet/status"
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

func SendSYN(device string, sMAC string, dMAC string, sIP string, dIP string, sPort uint16, dPort uint16, timeout int64) error {
	srcMAC, err := net.ParseMAC(sMAC)

	if err != nil {
		return &status.MyError{Msg: "srcMac conversion error", Code: 30000}
	}
	dstMAC, err := net.ParseMAC(dMAC)
	if err != nil {
		return &status.MyError{Msg: "dstMac conversion error", Code: 30001}
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
		return &status.MyError{Msg: "SerializeLayers error", Code: 30002}
	}
	t = time.Duration(timeout) * time.Second
	h, err := pcap.OpenLive(device, snaplen, promisc, t)
	if err != nil {
		return &status.MyError{Msg: "OpenLive error", Code: 30003}
	}
	h.WritePacketData(buf.Bytes())
	return nil
}

func SendTCP(srcIP string, srcPort string) error {
	conn, err := net.Dial("tcp", srcIP+":"+srcPort)
	if err != nil {
		return &status.MyError{Msg: "TCP connect error", Code: 30004}
	}
	defer conn.Close()
	return nil
}

func SendHTTP(method string, srcIP string, port string) error {
	url := "http://" + srcIP + ":" + port
	//fmt.Println(url)
	if method == "GET" {
		response, err := http.Get(url)
		if err != nil {
			return &status.MyError{Msg: "HTTP connect error", Code: 30005}
		}
		defer response.Body.Close()

	} else if method == "POST" {
		response, err := http.Post(url, "", nil)
		if err != nil {
			return &status.MyError{Msg: "HTTP connect error", Code: 30005}
		}
		defer response.Body.Close()

	}
	return nil
}
