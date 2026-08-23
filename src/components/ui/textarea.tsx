import React from 'react'

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>){
  return <textarea {...props} className={`w-full bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded focus:border-green-400 outline-none ${props.className || ''}`} />
}

