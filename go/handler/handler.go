package handler

import (
	"errors"
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
	timeout time.Duration
)

func SendTCP(device string, sMAC string, dMAC string, sIP string, dIP string, sPort uint16, dPort uint16) error {
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
	buf := gopacket.NewSerializeBuffer()
	opts := gopacket.SerializeOptions{
		FixLengths:       true,
		ComputeChecksums: true,
	}
	err := gopacket.SerializeLayers(buf, opts, &eth, &ipLayer, &tcpLayer)
	if err != nil {
		return errors.New("(*>△<)<ナーンナーンっっ")
	}
	timeout = 3 * time.Second
	h, err := pcap.OpenLive(device, snaplen, promisc, timeout)
	if err != nil {
		return errors.New("(*>△<)<ナーンナーンっっ")
	}
	h.WritePacketData(buf.Bytes())
	fmt.Println(buf.Bytes())
	return nil
}
