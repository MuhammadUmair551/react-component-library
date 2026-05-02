import React, { useState } from 'react'
import { VARIANTS } from './Alert.types';

function Alert({
  variant = "success", title = "Profile updated successfully", description = "Your changes have been saved and are now live", dismissible = true, icon = true, onDismiss,
}) {

  const [visible, setVisible] = useState(true);

  if (!visible) return null

  const v = VARIANTS[variant] ?? VARIANTS.success

  function handleDismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <div role='alert' className={`flex items-start gap-3 border-1-4 rounded-r-3xl p-4 border-l-8 ${v.container}`}>
      {
        icon && (
          <span className={`flex-shrink-0 mt-0.5 ${v.icon} `}>{v.iconPath}</span>
        )
      }

      <div className={`flex-1 min-w-0`}>
        {
          title && (
            <p className={`font-semibold text-sm leading-snug`}>{title}</p>
          )
        }
        {
          description && (
            <p className={`text-sm leading-relaxed ${title ? 'mt-1 opacity-80' : '' } `}>{description}</p>
          )
        }
      </div>
      {
        dismissible && (
          <button onClick={handleDismiss} 
          className={`flex-shrink-0 p-2 rounded-md transition-colors duration-150 focus:outline-none ${v.close}`} aria-label='Dismiss'>
            <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          </button>
        )
      }
    </div>
  )
}

export default Alert
