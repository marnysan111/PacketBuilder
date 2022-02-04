package handler

import (
	"PacketBuilder/packet/status"

	"github.com/google/gopacket/pcap"
)

func GetDevice() ([]pcap.Interface, error) {
	// Find all devices
	devices, err := pcap.FindAllDevs()
	if err != nil {
		return nil, &status.MyError{Msg: "Find Device error ", Code: 20001}
	}
	
	return devices, nil
}
