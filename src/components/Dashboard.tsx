import { useState } from "react";
import { Activity, ShieldAlert, Ban, AlertOctagon, RefreshCw, Calendar } from "lucide-react";
import { TrafficChart, AttackDistribution, SourceIPChart } from "./Charts";
import { DataTable } from "./DataTable";
import { useIntrusionData } from "../hooks/useIntrusionData";
import { cn } from "../lib/utils";

export function Dashboard() {
  const [mode, setMode] = useState<'live' | 'historical'>('live');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const liveData = useIntrusionData(mode, dateRange);

  const stats = [
    { label: "Total Traffic Processed", value: liveData.summary.totalTraffic, icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Alerts", value: liveData.summary.activeAlerts, icon: ShieldAlert, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Critical Threats", value: liveData.summary.criticalThreats, icon: AlertOctagon, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Blocked IPs", value: liveData.summary.blockedIPs, icon: Ban, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-serif italic text-[#141414] tracking-tight">System Overview</h2>
            {mode === 'live' ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-mono font-bold border border-emerald-500/20">
                <RefreshCw size={12} className="animate-spin" /> LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 text-xs font-mono font-bold border border-blue-500/20">
                <Calendar size={12} /> HISTORICAL
              </span>
            )}
          </div>
          <p className="text-sm font-mono text-gray-500 mt-1 uppercase tracking-wider">Based on CICIDS2017 Dataset Patterns</p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center bg-white border border-[#141414]/10 rounded-md p-1 shadow-sm">
            <button 
              onClick={() => setMode('live')}
              className={cn("px-3 py-1.5 text-xs font-mono font-bold rounded transition-colors", mode === 'live' ? "bg-[#141414] text-white" : "text-gray-500 hover:text-[#141414]")}
            >
              LIVE
            </button>
            <button 
              onClick={() => setMode('historical')}
              className={cn("px-3 py-1.5 text-xs font-mono font-bold rounded transition-colors", mode === 'historical' ? "bg-[#141414] text-white" : "text-gray-500 hover:text-[#141414]")}
            >
              HISTORICAL
            </button>
          </div>

          {mode === 'historical' ? (
            <div className="flex items-center gap-2 text-sm font-mono">
              <input 
                type="date" 
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="bg-white border border-[#141414]/10 rounded px-2 py-1 text-[#141414] focus:outline-none focus:border-blue-500"
              />
              <span className="text-gray-400">to</span>
              <input 
                type="date" 
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="bg-white border border-[#141414]/10 rounded px-2 py-1 text-[#141414] focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <div className="text-right">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Last Event</p>
              <p className="text-sm font-mono font-bold text-[#141414]">{liveData.recentAlerts[0]?.time} UTC</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-[#141414]/10 rounded-lg p-5 flex items-center gap-4 hover:border-[#141414]/30 transition-colors">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-xs font-serif italic text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-mono font-bold text-[#141414] mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#141414]/10 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif italic text-lg text-[#141414]">Network Traffic Analysis</h3>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">24h Trend</span>
          </div>
          <TrafficChart data={liveData.trafficTrend} />
        </div>
        
        <div className="bg-white border border-[#141414]/10 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif italic text-lg text-[#141414]">Attack Distribution</h3>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">Top 5</span>
          </div>
          <AttackDistribution data={liveData.attackTypes} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {liveData.attackTypes.slice(0, 4).map((type, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#141414] opacity-80"></span>
                <span className="truncate">{type.name}</span>
                <span className="ml-auto font-bold">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#141414]/10 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif italic text-lg text-[#141414]">Top Source IPs</h3>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">By Volume</span>
          </div>
          <SourceIPChart data={liveData.topSourceIPs} />
        </div>

        <div className="lg:col-span-2 bg-white border border-[#141414]/10 rounded-lg p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif italic text-lg text-[#141414]">Recent Alerts</h3>
            <button className="text-xs font-mono text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider">
              View All
            </button>
          </div>
          <div className="flex-1">
            <DataTable alerts={liveData.recentAlerts} />
          </div>
        </div>
      </div>
    </div>
  );
}
