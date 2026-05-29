function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage =
    ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">
          Step {currentStep + 1} of {totalSteps}
        </span>

        <span className="text-sm font-medium text-slate-600">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#27AE60] transition-all duration-300"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar