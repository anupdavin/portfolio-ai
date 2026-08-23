const nodes = [
  [18, 52], [31, 36], [45, 58], [58, 32], [70, 52], [82, 38], [88, 62],
] as const

export default function ReducedMotionFallback() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020203]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(96,165,250,0.06),transparent_34%),radial-gradient(circle_at_44%_58%,rgba(190,242,100,0.04),transparent_28%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.slice(1).map(([x, y], index) => {
          const [px, py] = nodes[index]
          return <line key={`${x}-${y}`} x1={px} y1={py} x2={x} y2={y} stroke="rgba(148,163,184,0.22)" strokeWidth="0.11" />
        })}
        {nodes.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 0.35} y={y - 0.35} width="0.7" height="0.7" fill={index % 2 === 0 ? 'rgba(190,242,100,0.72)' : 'rgba(96,165,250,0.65)'} />
            <circle cx={x} cy={y} r="1.15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.1" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-[8%] top-1/2 border-t border-white/[0.035]" />
    </div>
  )
}
