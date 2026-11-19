import { useState } from "react";
import "./DonutChart.css";
import CountUp from "./CountUp";

const R = 70;
const C = 2 * Math.PI * R;

function DonutChart({ stats }) {
  const [hovered, setHovered] = useState(null);
  const data = [
    { label: "Won", value: stats.won, color: "#09aa04" },
    { label: "Lost", value: stats.lost, color: "#fb0606" },
    { label: "Tied", value: stats.tied, color: "#e6c72e" },
  ];

  let offset = 0;
  const segments = data.map((d) => {
    const length = stats.played ? (d.value / stats.played) * C : 0;
    const seg = { ...d, length, offset: -offset };
    offset += length;
    return seg;
  });

  const active = hovered ?? data[0];

  return (
    <div className="donut-container">
      <svg viewBox="0 0 200 200" onMouseLeave={() => setHovered(null)}>
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="24"
        />
        {segments.map((s) => (
          <circle
            key={s.label}
            className="donut-segment"
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth="24"
            strokeDasharray={`${s.length} ${C}`}
            strokeDashoffset={s.offset}
            onMouseEnter={() => setHovered(s)}
          />
        ))}
      </svg>
      <div className="donut-center">
        <span className="donut-value">
          <CountUp value={active.value} duration={600} />
        </span>
        <span className="donut-label">{active.label}</span>
      </div>
    </div>
  );
}

export default DonutChart;
