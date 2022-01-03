package handler

import (
	"PacketBuilder/packet/status"
	"encoding/json"
	"fmt"

	"github.com/google/gopacket/pcap"
)

func GetDevice() ([]pcap.Interface, error) {
	// Find all devices
	devices, err := pcap.FindAllDevs()
	if err != nil {
		return nil, &status.MyError{Msg: "Find Device error ", Code: 20001}
	}
	device, err := json.Marshal(devices)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(device))
	// Print device information
	/*
		for _, device := range devices {
			fmt.Println("\nName: ", device.Name)
			fmt.Println("Description: ", device.Description)
			fmt.Println("Devices addresses: ", device.Description)
			for _, address := range device.Addresses {
				fmt.Println("- IP address: ", address.IP)
				fmt.Println("- Subnet mask: ", address.Netmask)
			}
		}
	*/
	return devices, nil
}
