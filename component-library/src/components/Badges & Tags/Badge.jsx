import React from 'react'

function Badge({ children, icon, dot, onRemove, variants, size, removable}) {
  return (
    <span>
        {dot && <span />}
        {removable && <button onClick={onRemove}>x</button> }
        {icon && icon}
        {children}
    </span>
  )
}

export default Badge
