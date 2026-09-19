import React, { useState } from 'react';

interface DataPoint {
  month: string;
  mandiA: number; // e.g. Warangal
  mandiB: number; // e.g. Hyderabad
  mandiC: number; // e.g. Khammam
}

interface PriceTrendChartProps {
  cropName: string;
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ cropName }) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  // Generate realistic historical monthly price trends for the selected crop
  const data: DataPoint[] = [
    { month: 'Apr', mandiA: 2100, mandiB: 2350, mandiC: 2200 },
    { month: 'May', mandiA: 2250, mandiB: 2480, mandiC: 2310 },
    { month: 'Jun', mandiA: 2180, mandiB: 2400, mandiC: 2260 },
    { month: 'Jul', mandiA: 2320, mandiB: 2580, mandiC: 2410 },
    { month: 'Aug', mandiA: 2400, mandiB: 2690, mandiC: 2520 },
    { month: 'Sep (Now)', mandiA: 2450, mandiB: 2750, mandiC: 2580 }
  ];

  // If crop is chilli, scale up prices
  const multiplier = cropName.toLowerCase().includes('chilli') ? 7.5 : cropName.toLowerCase().includes('cotton') ? 3.0 : 1.0;
  const scaledData = data.map(d => ({
    month: d.month,
    mandiA: Math.round(d.mandiA * multiplier),
    mandiB: Math.round(d.mandiB * multiplier),
    mandiC: Math.round(d.mandiC * multiplier),
  }));

  const allValues = scaledData.flatMap(d => [d.mandiA, d.mandiB, d.mandiC]);
  const minVal = Math.min(...allValues) * 0.92;
  const maxVal = Math.max(...allValues) * 1.08;
  const range = maxVal - minVal;

  const width = 600;
  const height = 220;
  const paddingX = 45;
  const paddingY = 25;

  const getX = (index: number) => paddingX + (index * (width - 2 * paddingX)) / (scaledData.length - 1);
  const getY = (val: number) => height - paddingY - ((val - minVal) / range) * (height - 2 * paddingY);

  const makePath = (key: 'mandiA' | 'mandiB' | 'mandiC') => {
    return scaledData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(d[key])}`).join(' ');
  };

  const pathA = makePath('mandiA');
  const pathB = makePath('mandiB');
  const pathC = makePath('mandiC');

  // Area under Hyderabad curve (mandiB)
  const areaB = `${pathB} L ${getX(scaledData.length - 1)},${height - paddingY} L ${getX(0)},${height - paddingY} Z`;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
        <div>
          <h4 className="text-base font-bold text-stone-900">
            Historical Mandi Price Trends (Last 6 Months)
          </h4>
          <p className="text-xs text-stone-500">
            Comparing modal wholesale rates for {cropName} across key regional grain & vegetable yards
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
            <span className="text-stone-700">Hyderabad (Bowenpally)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
            <span className="text-stone-700">Khammam</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="text-stone-700">Warangal</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          {/* Subtle Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingY + ratio * (height - 2 * paddingY);
            const val = Math.round(maxVal - ratio * range);
            return (
              <g key={i}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-stone-400 font-mono">
                  ₹{val}
                </text>
              </g>
            );
          })}

          {/* Area fill for highest market */}
          <path d={areaB} fill="rgba(16, 185, 129, 0.08)" />

          {/* Trend Lines */}
          <path d={pathC} fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
          <path d={pathA} fill="none" stroke="#f59e0b" strokeWidth="2.2" />
          <path d={pathB} fill="none" stroke="#059669" strokeWidth="3" />

          {/* Data Points */}
          {scaledData.map((d, i) => {
            const cx = getX(i);
            const cyB = getY(d.mandiB);
            const cyA = getY(d.mandiA);
            const cyC = getY(d.mandiC);
            const isHovered = activePoint === i;

            return (
              <g key={i} onMouseEnter={() => setActivePoint(i)} onMouseLeave={() => setActivePoint(null)} className="cursor-pointer">
                <circle cx={cx} cy={cyC} r={isHovered ? 5 : 3.5} fill="#0284c7" stroke="#fff" strokeWidth="2" />
                <circle cx={cx} cy={cyA} r={isHovered ? 5 : 3.5} fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                <circle cx={cx} cy={cyB} r={isHovered ? 6 : 4.5} fill="#059669" stroke="#fff" strokeWidth="2.5" />
                <text x={cx} y={height - 6} textAnchor="middle" className="text-[11px] fill-stone-500 font-medium">
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {activePoint !== null && (
          <div
            className="absolute top-2 bg-stone-900/90 text-white backdrop-blur-md px-3 py-2 rounded-xl text-xs shadow-xl pointer-events-none transition-all"
            style={{ left: `${(activePoint / (scaledData.length - 1)) * 75 + 10}%` }}
          >
            <p className="font-bold border-b border-stone-700 pb-1 mb-1 text-emerald-400">
              {scaledData[activePoint].month} Rates (₹/Quintal)
            </p>
            <p className="text-emerald-300">Hyderabad: ₹{scaledData[activePoint].mandiB.toLocaleString()}</p>
            <p className="text-sky-300">Khammam: ₹{scaledData[activePoint].mandiC.toLocaleString()}</p>
            <p className="text-amber-300">Warangal: ₹{scaledData[activePoint].mandiA.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};
