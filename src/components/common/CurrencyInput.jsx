import { forwardRef } from 'react'
import ErrorMessage from './ErrorMessage'
import { formatINR } from '../../utils/formatters'

const CurrencyInput = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      placeholder = 'Enter amount',
      error,
      helpText,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleChange = (event) => {
      const rawValue =
        event.target.value.replace(
          /\D/g,
          ''
        )

      onChange(rawValue)
    }

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

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            ₹
          </span>

          <input
            id={name}
            name={name}
            type="text"
            ref={ref}
            value={formatINR(value)}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!error}
            className={`w-full rounded-lg border py-3 pl-10 pr-4 text-slate-700 outline-none transition focus:ring-2 ${
              error
                ? 'border-[#E74C3C] focus:ring-red-200'
                : 'border-slate-300 focus:ring-blue-200'
            }`}
            {...props}
          />
        </div>

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

CurrencyInput.displayName =
  'CurrencyInput'

export default CurrencyInput