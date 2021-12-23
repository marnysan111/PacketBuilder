package handler

import (
	"fmt"
	"net"
	"os"
	"time"

	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	"github.com/google/gopacket/pcap"
)

var (
	snaplen int32 = 1024
	promisc bool
	timeout time.Duration
)

func SendTCP() {
	device := "enp0s8"
	sMAC := "08:00:27:24:2c:c1"
	dMAC := "0a:00:27:00:00:16"
	sIP := "192.168.56.100"
	dIP := "192.168.56.253"
	srcMAC, _ := net.ParseMAC(sMAC)
	dstMAC, _ := net.ParseMAC(dMAC)
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
		SrcPort:  layers.TCPPort(40000),
		DstPort:  layers.TCPPort(80),
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
	buf := gopacket.NewSerializeBuffer()
	opts := gopacket.SerializeOptions{
		FixLengths:       true,
		ComputeChecksums: true,
	}
	err := gopacket.SerializeLayers(buf, opts, &eth, &ipLayer, &tcpLayer)
	if err != nil {
		panic(err)
	}
	timeout = 3 * time.Second
	h, err := pcap.OpenLive(device, snaplen, promisc, timeout)
	if err != nil {
		fmt.Fprint(os.Stdout, "[pcap OpenLive ERROR]", err, "\n")
	}
	h.WritePacketData(buf.Bytes())
	fmt.Println(buf.Bytes())
}
