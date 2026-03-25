export const CICIDS_DATA = {
  summary: {
    totalTraffic: "1.24 TB",
    activeAlerts: 142,
    criticalThreats: 12,
    blockedIPs: 84,
  },
  trafficTrend: [
    { time: "00:00", normal: 4000, attack: 240 },
    { time: "04:00", normal: 3000, attack: 1398 },
    { time: "08:00", normal: 2000, attack: 9800 },
    { time: "12:00", normal: 2780, attack: 3908 },
    { time: "16:00", normal: 1890, attack: 4800 },
    { time: "20:00", normal: 2390, attack: 3800 },
    { time: "24:00", normal: 3490, attack: 4300 },
  ],
  attackTypes: [
    { name: "DoS Hulk", value: 45 },
    { name: "PortScan", value: 25 },
    { name: "DDoS", value: 15 },
    { name: "Botnet", value: 10 },
    { name: "Web Attack", value: 5 },
  ],
  recentAlerts: [
    { id: "ALT-8921", time: "10:42:15", sourceIP: "192.168.10.50", destIP: "192.168.10.3", type: "DoS Hulk", severity: "High", status: "Blocked" },
    { id: "ALT-8920", time: "10:41:02", sourceIP: "172.16.0.1", destIP: "192.168.10.50", type: "PortScan", severity: "Medium", status: "Investigating" },
    { id: "ALT-8919", time: "10:38:45", sourceIP: "10.0.0.15", destIP: "192.168.10.8", type: "Web Attack - Brute Force", severity: "Critical", status: "Blocked" },
    { id: "ALT-8918", time: "10:35:12", sourceIP: "192.168.10.12", destIP: "8.8.8.8", type: "Botnet Activity", severity: "High", status: "Active" },
    { id: "ALT-8917", time: "10:30:05", sourceIP: "192.168.10.50", destIP: "192.168.10.3", type: "DoS GoldenEye", severity: "High", status: "Blocked" },
    { id: "ALT-8916", time: "10:25:50", sourceIP: "172.16.0.100", destIP: "192.168.10.50", type: "Infiltration", severity: "Critical", status: "Active" },
  ],
  topSourceIPs: [
    { ip: "192.168.10.50", count: 12450 },
    { ip: "172.16.0.1", count: 8900 },
    { ip: "10.0.0.15", count: 4500 },
    { ip: "192.168.10.12", count: 3200 },
    { ip: "172.16.0.100", count: 2100 },
  ]
};
