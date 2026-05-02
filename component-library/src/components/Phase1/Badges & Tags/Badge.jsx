import React from 'react'
import { SIZES, VARIANTS } from './Badge.types'
import InputField from '../InputFields/InputField';

function Badge({ children = 'Verified', icon =false, dot = true, onRemove, variant = "success", size='md', removable = false, outlined = true }) {
  const v = VARIANTS[variant] ?? VARIANTS.default
  const s = SIZES[size] ?? SIZES.md

  const colorClass = outlined ? v.outlined : v.solid;

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full
  whitespace-nowrap ${s.badge} ${colorClass}`}>
      {dot && <span className={`rounded-full flex-shrink-0 ${s.dot} ${v.dot}`} />}
      {removable && <button onClick={onRemove}>x</button>}
      {icon && ( <span className={`flex-shrink-0 ${s.icon}`}>
        {icon} 
        </span> )}
      {children}
    </span>
  )
}


export default Badge
