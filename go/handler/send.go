package handler

import (
	"PacketBuilder/packet/status"
	"bufio"
	"fmt"
	"net"
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

func SendTCP() error {
	conn, err := net.Dial("tcp", "192.168.1.254:8080")
	if err != nil {
		return err
	}
	defer conn.Close()

	fmt.Fprintf(conn, "Hello, Socket Connection !")
	status, err := bufio.NewReader(conn).ReadString('\n')
	if err != nil {
		return err
	}
	fmt.Println(status)

	return nil
}

func SendHTTP() error {

}
