import React, { useEffect, useState } from 'react'
import { VARIANTS } from './Alert.types';

function Toast(
  {
    variants = "success", onClose, duration, position, id, title = "WOHU", description = "done"
  }
) {
  const [visible, setVisible] = useState(false);

  const v = VARIANTS[variants] ?? VARIANTS.success;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, [])
  return (
    <div className={`flex items-start gap-3 bg-white border border-gray-100  border-1-4 ${v.container.split(' ')[1]} rounded-xl shadow-lg p-4 w-80 max-w-full transition-all duration-300 ease-out ${visible ? 'translate-x-4 opacity-100' : 'translate-x-full opacity-0'}`}>

      <span className={`flex-shrink-0 mt-0.5 ${v.icon}`}  >
        {v.iconPath}
      </span>

      <div>
        {
          title && (
            <p>{title}</p>
          )
        }
        {
          description && (
            <p>{description}</p>
          )
        }
      </div>
    </div>
  )
}

export default Toast
