import React from 'react'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'outline' }

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps){
  const base = 'inline-block text-xs px-2 py-1 rounded'
  const styles = variant === 'outline' ? 'border border-current' : 'bg-green-600 text-black'
  return <span className={`${base} ${styles} ${className}`} {...props} />
}

