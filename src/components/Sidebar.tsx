import { Shield, Activity, AlertTriangle, Network, Search, Bell, Settings, User, Menu, Database, ChevronRight, BarChart2 } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { icon: Activity, label: "Dashboard", active: true },
    { icon: AlertTriangle, label: "Threat Alerts", active: false },
    { icon: Network, label: "Network Traffic", active: false },
    { icon: Database, label: "CICIDS Datasets", active: false },
    { icon: BarChart2, label: "Reports", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <aside className={cn(
      "bg-[#141414] text-[#E4E3E0] h-screen flex flex-col transition-all duration-300 border-r border-[#2A2A2A]",
      isOpen ? "w-64" : "w-20"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-[#2A2A2A]">
        <div className="flex items-center gap-3 overflow-hidden">
          <Shield className="text-emerald-500 shrink-0" size={28} />
          {isOpen && <span className="font-mono font-bold tracking-tight whitespace-nowrap">NIDS-CAN</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2 px-3">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full text-left",
              item.active 
                ? "bg-[#2A2A2A] text-white border-l-2 border-emerald-500" 
                : "text-gray-400 hover:bg-[#1A1A1A] hover:text-gray-200"
            )}
          >
            <item.icon size={20} className="shrink-0" />
            {isOpen && <span className="font-sans text-sm font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <User size={16} className="text-emerald-400" />
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-500 font-mono truncate">ID: 9482-A</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
