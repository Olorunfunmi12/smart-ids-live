import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#141414', '#4A4A4A', '#8A8A8A', '#B4B4B4', '#D4D4D4'];

export function TrafficChart({ data }: { data: any[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAttack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" opacity={0.1} vertical={false} />
          <XAxis dataKey="time" stroke="#8A8A8A" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#8A8A8A" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', borderColor: '#2A2A2A', color: '#E4E3E0', fontFamily: 'monospace', fontSize: '12px' }}
            itemStyle={{ color: '#E4E3E0' }}
          />
          <Area type="monotone" dataKey="normal" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorNormal)" />
          <Area type="monotone" dataKey="attack" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAttack)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AttackDistribution({ data }: { data: any[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#141414', borderColor: '#2A2A2A', color: '#E4E3E0', fontFamily: 'monospace', fontSize: '12px' }}
            itemStyle={{ color: '#E4E3E0' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SourceIPChart({ data }: { data: any[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" opacity={0.1} horizontal={false} />
          <XAxis type="number" stroke="#8A8A8A" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis dataKey="ip" type="category" stroke="#141414" fontSize={11} tickLine={false} axisLine={false} fontFamily="monospace" />
          <Tooltip 
            cursor={{fill: 'rgba(20, 20, 20, 0.05)'}}
            contentStyle={{ backgroundColor: '#141414', borderColor: '#2A2A2A', color: '#E4E3E0', fontFamily: 'monospace', fontSize: '12px' }}
          />
          <Bar dataKey="count" fill="#141414" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
