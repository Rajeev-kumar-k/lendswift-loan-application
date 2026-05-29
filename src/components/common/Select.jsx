import { forwardRef } from 'react'
import ErrorMessage from './ErrorMessage'

const Select = forwardRef(
  (
    {
      label,
      name,
      options = [],
      placeholder = 'Select an option',
      error,
      helpText,
      disabled = false,
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

        <select
          id={name}
          name={name}
          ref={ref}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${name}-error`
              : undefined
          }
          className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-700 outline-none transition focus:ring-2 ${
            error
              ? 'border-[#E74C3C] focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-200'
          } ${
            disabled
              ? 'cursor-not-allowed bg-slate-100 opacity-70'
              : ''
          } ${className}`}
          {...props}
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

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

Select.displayName = 'Select'

export default Select