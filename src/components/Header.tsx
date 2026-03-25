import { Search, Bell, ShieldAlert } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-[#141414]/10 bg-[#E4E3E0] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="font-serif italic text-xl text-[#141414] tracking-wide">
          Intrusion Detection System
        </h1>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-mono font-bold border border-emerald-500/20">
          SYSTEM ACTIVE
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search IPs, Alerts, Rules..." 
            className="pl-9 pr-4 py-1.5 bg-white/50 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-black transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button className="text-gray-600 hover:text-black transition-colors">
            <ShieldAlert size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
