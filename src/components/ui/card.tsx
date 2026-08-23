import React from 'react'

export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={`bg-black/60 border border-gray-700 rounded ${className}`} {...props} />
}

export function CardHeader({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={`p-6 pb-4 ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={`p-6 ${className}`} {...props} />
}

