package status

type TCP struct {
	SrcIP   string `JSON:"srcIP"`
	DstIP   string `JSON:"dstIP"`
	SrcMac  string `JSON:"srcMac"`
	DstMac  string `JSON:"dstMac"`
	SrcPort uint16 `JSON:"srcPort"`
	DstPort uint16 `JSON:"dstPort"`
	Times   int    `JSON:"times"`
	Device  string `JSON:"device"`
}
