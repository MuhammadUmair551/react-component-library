import React from 'react';

// ── Icons ──
function ErrorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
        10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

// ── FormField ──
export function FormField({
  label,
  name,
  type        = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required    = false,
  disabled    = false,
  showSuccess = false,
  leftIcon    = null,
  rightIcon   = null,
  options     = [],       // select ke liye
  rows        = 4,        // textarea ke liye
  className   = '',
}) {
  const hasError   = Boolean(error);
  const hasSuccess = showSuccess && !hasError && value;

  const baseInput = `
    w-full text-sm rounded-lg border outline-none
    transition-all duration-150
    disabled:bg-gray-50 disabled:text-gray-400
    disabled:cursor-not-allowed
  `;

  const stateClass = hasError
    ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/15 pr-9'
    : hasSuccess
    ? 'border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/15 pr-9'
    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';

  const paddingClass = leftIcon
    ? 'pl-10 pr-3.5 py-2.5'
    : 'px-3.5 py-2.5';

  // ── Render correct input type ──
  function renderInput() {
    if (type === 'select') {
      return (
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`
              ${baseInput} ${stateClass} ${paddingClass}
              appearance-none cursor-pointer
              bg-white text-gray-900
            `}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom arrow */}
          <span className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400 pointer-events-none
          ">
            <svg width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`
            ${baseInput} ${stateClass} ${paddingClass}
            text-gray-900 placeholder:text-gray-400
            resize-none leading-relaxed
          `}
        />
      );
    }

    if (type === 'checkbox') {
      return (
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            name={name}
            id={name}
            checked={Boolean(value)}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="
              mt-0.5 w-4 h-4 rounded
              accent-blue-600 cursor-pointer
            "
          />
          {label && (
            <label
              htmlFor={name}
              className="text-sm text-gray-600 leading-relaxed cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        {leftIcon && (
          <span className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-gray-400 pointer-events-none
          ">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            ${baseInput} ${stateClass}
            ${leftIcon ? 'pl-10' : 'px-3.5'} py-2.5
            text-gray-900 placeholder:text-gray-400
          `}
        />
        {/* Status icon — right side */}
        {(hasError || hasSuccess) && (
          <span className={`
            absolute right-3 top-1/2 -translate-y-1/2
            ${hasError ? 'text-red-400' : 'text-green-500'}
          `}>
            {hasError ? <ErrorIcon /> : <CheckIcon />}
          </span>
        )}
        {rightIcon && !hasError && !hasSuccess && (
          <span className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400
          ">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }

  // Checkbox ka label upar nahi dikhana
  if (type === 'checkbox') {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {renderInput()}
        {hasError && (
          <p className="text-xs text-red-500 flex items-center gap-1 ml-6">
            <ErrorIcon /> {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-0.5">*</span>
          )}
        </label>
      )}

      {/* Input */}
      {renderInput()}

      {/* Error ya helper text */}
      {hasError ? (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <ErrorIcon /> {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-gray-400">{helperText}</p>
      ) : null}
    </div>
  );
}