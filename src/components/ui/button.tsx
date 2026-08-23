import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }

export function Button({ className = '', variant = 'default', ...props }: ButtonProps){
  const base = 'px-4 py-2 rounded transition-all duration-300'
  const styles = variant === 'outline'
    ? 'border border-green-400 text-green-400 hover:bg-green-400 hover:text-black glow-border'
    : 'bg-green-600 hover:bg-green-500 text-black font-bold glow-border'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}

