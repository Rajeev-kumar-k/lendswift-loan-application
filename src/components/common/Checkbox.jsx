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
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-slate-300 text-[#1F4E79] focus:ring-[#1F4E79]"
          {...props}
        />

        <span className="text-sm text-slate-700">
          {label}
        </span>
      </label>

      <ErrorMessage
        message={error}
      />
    </div>
  )
}

export default Checkbox