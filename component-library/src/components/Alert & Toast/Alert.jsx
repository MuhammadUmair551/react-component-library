import React, { useState } from 'react'
import { VARIANTS } from './Alert.types';

function Alert({
  variant = "success", title="Profile updated successfully", description="Your changes have been saved and are now live", dismissible = false, icon = true, onDismiss,
}) {

  const [visible, setVisible] = useState(true);

  if (!visible) return null

  const v = VARIANTS[variant] ?? VARIANTS.success

  function handleDismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <div role='alert' className={`flex items-start`}>
      {
        icon && (
          <span>{v.iconPath}</span>
        )
      }
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
      {
        dismissible && (
          <button>X</button>
        )
      }
    </div>
  )
}

export default Alert
