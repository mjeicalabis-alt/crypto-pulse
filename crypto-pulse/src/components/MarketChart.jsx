import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = () => {
  const { coins } = useCrypto();

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  // Prevent rendering before data exists
  if (!coins.length) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "400px",   // ✅ REAL HEIGHT FIX
        marginTop: "40px"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22d3ee"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;