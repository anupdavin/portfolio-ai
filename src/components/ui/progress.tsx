export function Progress({ value = 0, className = '' }: { value?: number, className?: string }){
  return (
    <div className={`w-full bg-gray-800 rounded overflow-hidden ${className}`}>
      <div className="h-2 bg-green-400" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

