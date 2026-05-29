import { forwardRef } from 'react'
import ErrorMessage from './ErrorMessage'

const MaskedInput = forwardRef(
  (
    {
      label,
      name,
      value = '',
      onChange,
      placeholder,
      error,
      maskType = 'aadhaar',
      disabled = false,
      isMasked = false,
      ...props
    },
    ref
  ) => {
    const getMaskedValue = () => {
      if (!value) {
        return ''
      }

      if (!isMasked) {
        return value
      }

      if (maskType === 'pan') {
        return value.length > 4
          ? `XXXXXX${value.slice(-4)}`
          : value
      }

      return value.length > 4
        ? `XXXX XXXX ${value.slice(-4)}`
        : value
    }

    const handleChange = (
      event
    ) => {
      const rawValue =
        event.target.value
          .replace(/\s/g, '')
          .toUpperCase()

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

        <input
          id={name}
          name={name}
          type="text"
          ref={ref}
          value={getMaskedValue()}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          className={`w-full rounded-lg border px-4 py-3 text-slate-700 outline-none transition focus:ring-2 ${
            error
              ? 'border-[#E74C3C] focus:ring-red-200'
              : 'border-slate-300 focus:ring-blue-200'
          }`}
          {...props}
        />

        <ErrorMessage message={error} />
      </div>
    )
  }
)

MaskedInput.displayName =
  'MaskedInput'

export default MaskedInput