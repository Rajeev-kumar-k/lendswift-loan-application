import ErrorMessage from './ErrorMessage'

function Checkbox({
  label,
  checked,
  onChange,
  error,
  ...props
}) {
  return (
    <div className="w-full">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-1 h-5 w-5 shrink-0 accent-[#1F4E79]"
          {...props}
        />

        <span className="text-sm text-slate-700 break-words">
          {label}
        </span>
      </label>

      {error && (
        <ErrorMessage
          message={error}
        />
      )}
    </div>
  )
}

export default Checkbox