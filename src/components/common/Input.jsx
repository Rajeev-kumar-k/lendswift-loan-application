import { forwardRef } from 'react'
import ErrorMessage from './ErrorMessage'

const Input = forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      placeholder,
      error,
      helpText,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            {label}
          </label>
        )}

        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${name}-error`
              : undefined
          }
          className={`w-full rounded-lg border px-4 py-3 text-slate-700 outline-none transition focus:ring-2 ${
            error
              ? 'border-[#E74C3C] focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-200'
          } ${className}`}
          {...props}
        />

        {helpText && (
          <p className="mt-1 text-sm text-slate-500">
            {helpText}
          </p>
        )}

        <ErrorMessage message={error} />
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input