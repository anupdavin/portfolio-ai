export default function ReducedMotionFallback() {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none opacity-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>
    </div>
  )
}
