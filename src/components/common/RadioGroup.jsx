import ErrorMessage from './ErrorMessage'

function RadioGroup({
  label,
  name,
  options = [],
  selectedValue,
  onChange,
  error,
  direction = 'vertical',
}) {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 text-sm font-semibold text-slate-700">
          {label}
        </p>
      )}

      <div
        className={`flex gap-4 ${
          direction === 'horizontal'
            ? 'flex-row flex-wrap'
            : 'flex-col'
        }`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 p-3 transition hover:border-[#1F4E79]"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={
                selectedValue === option.value
              }
              onChange={onChange}
              aria-invalid={!!error}
              className="h-4 w-4 text-[#1F4E79] focus:ring-[#1F4E79]"
            />

            <span className="text-sm text-slate-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <ErrorMessage message={error} />
    </div>
  )
}

export default RadioGroup