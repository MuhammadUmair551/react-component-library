import React from 'react'

function InputField({ onchange, label = 'Email', type, placeholder, value, disabled, required, leftIcon, rightIcon = "✉️", hasError=true, error=true }) {
    const inputClasses = `px-3.5 py-2.5 border-2 border-gray-300 rounded-lg bg-white placeholder:text-pink-400 text-sm text-gray-900 transition-all duration-150 outline-none focus:border-blue-500 focus:ring-2
    disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed w-full `

    const labelClasses = `text-sm font-medium text-gray-700`

    const wrapperClass = `flex flex-col gap-1.5 w-[200px] p-3 bg-gray-200`
    return (
        <div className={wrapperClass}>
            {
                label && (
                    <label className={labelClasses}>
                        {label}
                        {required && <span className='text-red-500 ml-0.5'>*</span>}
                    </label>
                )
            }
            <div className='relative'>
                {
                    leftIcon && (
                        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
                            {leftIcon}
                        </div>
                    )
                }
                <input onChange={onchange} value={value} placeholder={placeholder} className={inputClasses} />
                {
                    rightIcon && (
                        <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                            {rightIcon}
                        </div>
                    )
                }
                {hasError && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}

export default InputField
