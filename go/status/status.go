package status

type SYN struct {
	Device  string `JSON:"device"`
	SrcIP   string `JSON:"srcIP"`
	DstIP   string `JSON:"dstIP"`
	SrcMac  string `JSON:"srcMac"`
	DstMac  string `JSON:"dstMac"`
	SrcPort int    `JSON:"srcPort"` // uint16
	DstPort int    `JSON:"dstPort"` // uint16
	Timeout int    `JSON:"timeout"` // int64
	Times   int    `JSON:"times"`
}

type Device struct {
	Name  string `JSON:"device"`
	IPADD string `JSON:"ipADD"`
	Mask  string `JSON:"mask"`
}

type HTTP struct {
	DstIP   string `JSON:"dstIP"`
	Methods string `JSON:"methods"`
	Times   int    `JSON:"times"`
	Port    string `JSON:"port"`
}

type TCP struct {
	DstIP string `json:"dstIP,omitempty"`
	Times int    `json:"times,omitempty"`
	Port  string `json:"port,omitempty"`
}
