import React from 'react';

// Spinner
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4"
      viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  );
}

export function Form({
  onSubmit,
  children,
  className = '',
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate     // browser validation off — humari validation chalegi
      className={`w-full space-y-5 ${className}`}
    >
      {children}
    </form>
  );
}

// Submit button — loading state ke saath
Form.Submit = function FormSubmit({
  children     = 'Submit',
  isLoading    = false,
  loadingText  = 'Please wait...',
  variant      = 'primary',
  fullWidth    = true,
  className    = '',
}) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    green:   'bg-green-600 hover:bg-green-700 text-white',
    danger:  'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`
        flex items-center justify-content gap-2
        px-5 py-2.5 rounded-lg text-sm font-medium
        transition-all duration-150
        focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-70 disabled:cursor-not-allowed
        ${variants[variant] ?? variants.primary}
        ${fullWidth ? 'w-full justify-center' : ''}
        ${className}
      `}
    >
      {isLoading && <Spinner />}
      {isLoading ? loadingText : children}
    </button>
  );
};