
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import type { ChartDataPoint } from '../types';

interface PriceChartProps {
  data: ChartDataPoint[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return null;
    }
    const prices = data.map(p => p.price);
    const yMin = Math.min(...prices) * 0.99;
    const yMax = Math.max(...prices) * 1.01;


  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
        <XAxis dataKey="name" stroke="#A0AEC0" />
        <YAxis stroke="#A0AEC0" domain={[yMin, yMax]} tickFormatter={(tick) => `$${tick.toFixed(2)}`} />
        <Tooltip
            contentStyle={{
                backgroundColor: '#1A202C',
                border: '1px solid #4A5568',
                color: '#E2E8F0'
            }}
            itemStyle={{ color: '#90CDF4' }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Legend wrapperStyle={{color: '#E2E8F0'}}/>
        <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#2DD4BF" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#2DD4BF' }}
            activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
