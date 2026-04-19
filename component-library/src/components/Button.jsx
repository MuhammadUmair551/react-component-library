import React from 'react'

const variants = {
  primary:   'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
  outline:   'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
  ghost:     'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
  danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5 h-8',
  md: 'text-sm px-4 py-2 h-10',
  lg: 'text-base px-6 py-2.5 h-12',
};

function Button({ variant, children, disabled, onClick, isLoading, children, size}) {
  return (
    <button onClick={onClick} disabled={disabled || isLoading}>
      {isLoading && <span>Loading...</span>}
      {children}
    </button>
  )
}

export default Button
