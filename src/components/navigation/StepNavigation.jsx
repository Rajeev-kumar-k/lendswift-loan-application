function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex-1 min-w-0 rounded-lg bg-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-6 sm:py-2 sm:text-base"
      >
        Previous
      </button>

      <button
        type="button"
        className="flex-1 min-w-0 rounded-lg border border-[#1F4E79] px-3 py-3 text-sm font-medium text-[#1F4E79] transition hover:bg-slate-100 sm:flex-none sm:px-6 sm:py-2 sm:text-base"
      >
        Save Draft
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex-1 min-w-0 rounded-lg bg-[#1F4E79] px-3 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-6 sm:py-2 sm:text-base"
      >
        Next
      </button>
    </div>
  )
}

export default StepNavigation