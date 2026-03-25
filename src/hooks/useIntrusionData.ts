import { useState, useEffect } from 'react';
import { CICIDS_DATA } from '../data/mockData';

const attackTypes = ["DoS Hulk", "PortScan", "DDoS", "Botnet", "Web Attack - Brute Force", "Infiltration", "Heartbleed"];
const severities = ["Low", "Medium", "High", "Critical"];
const statuses = ["Active", "Investigating", "Blocked"];

const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

export function useIntrusionData(mode: 'live' | 'historical', dateRange: { start: string, end: string }) {
  const [data, setData] = useState(CICIDS_DATA);

  useEffect(() => {
    if (mode === 'live') {
      // Reset to base data when switching back to live
      setData(CICIDS_DATA);
      
      const interval = setInterval(() => {
        setData(prevData => {
          const now = new Date();
          const timeString = now.toLocaleTimeString('en-US', { hour12: false });
          const shortTimeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

          const newAlert = {
            id: `ALT-${Math.floor(Math.random() * 10000 + 9000)}`,
            time: timeString,
            sourceIP: generateRandomIP(),
            destIP: "192.168.10.50",
            type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
          };

          const newNormalTraffic = Math.floor(Math.random() * 2000) + 2000;
          const newAttackTraffic = newAlert.severity === 'Critical' 
            ? Math.floor(Math.random() * 5000) + 4000 
            : Math.floor(Math.random() * 1000) + 100;

          const newTrend = [
            ...prevData.trafficTrend.slice(1),
            { time: shortTimeString, normal: newNormalTraffic, attack: newAttackTraffic }
          ];

          const newSourceIPs = [...prevData.topSourceIPs];
          if (Math.random() > 0.5) {
            newSourceIPs[0].count += Math.floor(Math.random() * 100);
          } else if (Math.random() > 0.8) {
            newSourceIPs[1].count += Math.floor(Math.random() * 50);
          }

          const newAttackTypes = prevData.attackTypes.map(at => {
            if (at.name === newAlert.type || (at.name === "Web Attack" && newAlert.type.includes("Web"))) {
              return { ...at, value: at.value + 1 };
            }
            return at;
          });

          return {
            summary: {
              ...prevData.summary,
              activeAlerts: Math.max(0, prevData.summary.activeAlerts + (newAlert.status === 'Active' ? 1 : Math.random() > 0.7 ? -1 : 0)),
              blockedIPs: prevData.summary.blockedIPs + (newAlert.status === 'Blocked' ? 1 : 0),
            },
            trafficTrend: newTrend,
            attackTypes: newAttackTypes,
            recentAlerts: [newAlert, ...prevData.recentAlerts.slice(0, 5)],
            topSourceIPs: newSourceIPs.sort((a, b) => b.count - a.count),
          };
        });
      }, 2500);

      return () => clearInterval(interval);
    } else {
      // Historical Mode
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

      const histData = {
        summary: {
          totalTraffic: `${(1.24 * days * (Math.random() * 0.5 + 0.8)).toFixed(2)} TB`,
          activeAlerts: 0, // No active alerts in the past
          criticalThreats: Math.floor(12 * days * (Math.random() * 0.5 + 0.5)),
          blockedIPs: Math.floor(84 * days * (Math.random() * 0.5 + 0.5)),
        },
        trafficTrend: Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(start.getTime() + i * (end.getTime() - start.getTime()) / 6);
          return {
            time: `${d.getMonth()+1}/${d.getDate()}`,
            normal: Math.floor(Math.random() * 50000) + 20000,
            attack: Math.floor(Math.random() * 10000) + 1000,
          };
        }),
        attackTypes: CICIDS_DATA.attackTypes.map(at => ({ 
          ...at, 
          value: Math.floor(at.value * days * (Math.random() * 0.5 + 0.5)) 
        })),
        recentAlerts: Array.from({ length: 15 }).map((_, i) => {
          const alertTime = new Date(end.getTime() - Math.random() * (end.getTime() - start.getTime()));
          return {
            id: `ALT-HST-${Math.floor(Math.random() * 10000 + 9000)}`,
            time: alertTime.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            sourceIP: generateRandomIP(),
            destIP: "192.168.10.50",
            type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            status: "Resolved",
          };
        }).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()),
        topSourceIPs: CICIDS_DATA.topSourceIPs.map(ip => ({ 
          ...ip, 
          count: Math.floor(ip.count * days * (Math.random() * 0.5 + 0.5)) 
        })).sort((a, b) => b.count - a.count),
      };
      setData(histData);
    }
  }, [mode, dateRange.start, dateRange.end]);

  return data;
}
