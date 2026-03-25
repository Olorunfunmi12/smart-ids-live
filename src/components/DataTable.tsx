import { cn } from "../lib/utils";

export function DataTable({ alerts }: { alerts: any[] }) {
  return (
    <div className="w-full overflow-x-auto border border-[#141414]/10 rounded-md bg-white">
      <div className="grid grid-cols-7 gap-4 p-3 border-b border-[#141414]/10 bg-[#141414]/5 text-[#141414]/60 font-serif italic text-[11px] uppercase tracking-wider">
        <div className="col-span-1">Alert ID</div>
        <div className="col-span-1">Time</div>
        <div className="col-span-1">Source IP</div>
        <div className="col-span-1">Dest IP</div>
        <div className="col-span-1">Attack Type</div>
        <div className="col-span-1">Severity</div>
        <div className="col-span-1">Status</div>
      </div>
      
      <div className="divide-y divide-[#141414]/5">
        {alerts.map((alert, idx) => (
          <div 
            key={idx} 
            className="grid grid-cols-7 gap-4 p-3 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors cursor-pointer group text-sm font-mono"
          >
            <div className="col-span-1 font-bold">{alert.id}</div>
            <div className="col-span-1 text-gray-500 group-hover:text-gray-400">{alert.time}</div>
            <div className="col-span-1">{alert.sourceIP}</div>
            <div className="col-span-1">{alert.destIP}</div>
            <div className="col-span-1 truncate">{alert.type}</div>
            <div className="col-span-1">
              <span className={cn(
                "px-2 py-0.5 rounded text-xs",
                alert.severity === 'Critical' ? "bg-red-500/20 text-red-700 group-hover:text-red-400" :
                alert.severity === 'High' ? "bg-orange-500/20 text-orange-700 group-hover:text-orange-400" :
                "bg-yellow-500/20 text-yellow-700 group-hover:text-yellow-400"
              )}>
                {alert.severity}
              </span>
            </div>
            <div className="col-span-1">
              <span className={cn(
                "flex items-center gap-1.5",
                alert.status === 'Blocked' ? "text-emerald-600 group-hover:text-emerald-400" :
                alert.status === 'Active' ? "text-red-600 group-hover:text-red-400 animate-pulse" :
                "text-blue-600 group-hover:text-blue-400"
              )}>
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  alert.status === 'Blocked' ? "bg-emerald-500" :
                  alert.status === 'Active' ? "bg-red-500" :
                  "bg-blue-500"
                )}></span>
                {alert.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
