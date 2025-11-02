type WheelProps = {
  segments: string[];
  rotationDeg?: number;
  spinning?: boolean;
  onDone?: () => void;
};

const COLORS = [
  "#fde047",
  "#fca5a5",
  "#86efac",
  "#93c5fd",
  "#f9a8d4",
  "#fcd34d",
  "#c4b5fd",
  "#fdba74",
];

export default function Wheel({
  segments,
  rotationDeg = 0,
  spinning = false,
  onDone,
}: WheelProps) {
  const n = Math.max(segments.length, 1);

  const stops = segments.map((_, i) => {
    const c = COLORS[i % COLORS.length];
    const start = (i / n) * 100;
    const end = ((i + 1) / n) * 100;
    return `${c} ${start}% ${end}%`;
  });

  return (
    <div className="relative mx-auto h-64 w-64 select-none">
      <div
        className="absolute left-1/2 -top-4 -translate-x-1/2 z-10 pointer-events-none"
        aria-hidden
      >
        <svg width="44" height="50" viewBox="0 0 44 50" className="drop-shadow">
          <path
            d="M22 18 L10 48 L34 48 Z"
            fill="#ef4444"
            stroke="#111827"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div
        className="relative h-full w-full overflow-hidden rounded-full border shadow-inner"
        style={{
          background: `conic-gradient(from -90deg, ${stops.join(",")})`,
          transform: `rotate(${rotationDeg}deg)`,
          transition: spinning
            ? "transform 3000ms cubic-bezier(0.2, 0.8, 0, 1)"
            : "transform 0ms linear",
        }}
        onTransitionEnd={onDone}
        role="img"
        aria-label="Prize wheel"
      >
        <div className="pointer-events-none absolute inset-3 rounded-full border border-black/30" />

        <div className="absolute inset-0">
          {segments.map((label, i) => {
            const angle = (360 / n) * i + 180 / n;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{ rotate: `${angle}deg` }}
              >
                <span
                  className="absolute left-1/2 top-[12px] -translate-x-1/2 whitespace-nowrap rounded bg-white/85 px-1 text-[11px] font-medium text-gray-800"
                  style={{ rotate: `${-angle}deg` }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
