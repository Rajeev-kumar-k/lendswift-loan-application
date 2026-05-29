import { forwardRef } from 'react'
import ErrorMessage from './ErrorMessage'

const Checkbox = forwardRef(
  (
    {
      label,
      name,
      error,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label
          className={`flex cursor-pointer items-start gap-3 ${
            disabled
              ? 'cursor-not-allowed opacity-60'
              : ''
          }`}
        >
          <input
            ref={ref}
            id={name}
            name={name}
            type="checkbox"
            disabled={disabled}
            aria-invalid={!!error}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-[#1F4E79] focus:ring-[#1F4E79]"
            {...props}
          />

          <span className="text-sm text-slate-700">
            {label}
          </span>
        </label>

        <ErrorMessage message={error} />
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox