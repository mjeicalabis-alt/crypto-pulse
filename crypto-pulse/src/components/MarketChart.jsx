import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = () => {
  const { coins, currency } = useCrypto();
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  if (!coins.length) return null;

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₱';

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toggle Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setChartType('line')}
          className={`px-3 py-1 text-sm font-bold rounded-lg transition-colors ${
            chartType === 'line' 
              ? 'bg-cyan-600 text-white' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Line
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`px-3 py-1 text-sm font-bold rounded-lg transition-colors ${
            chartType === 'bar' 
              ? 'bg-cyan-600 text-white' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          Bar
        </button>
      </div>

      {/* Chart Container */}
      <div className="flex-grow h-[350px]"> {/* Fixed height for the chart area */}
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                formatter={(value) => [`${currencySymbol}${value.toLocaleString()}`, 'Price']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: '#0f172a', stroke: '#22d3ee', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#22d3ee', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
              />
              <Tooltip 
                cursor={{fill: '#1e293b', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                formatter={(value) => [`${currencySymbol}${value.toLocaleString()}`, 'Price']}
              />
              <Bar 
                dataKey="price" 
                fill="#22d3ee" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;