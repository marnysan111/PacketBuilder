package status

type TCP struct {
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
