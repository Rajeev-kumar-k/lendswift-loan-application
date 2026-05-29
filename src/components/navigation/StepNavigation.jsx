function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="rounded-lg bg-slate-300 px-6 py-2 font-medium text-slate-700 transition hover:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <button
        type="button"
        className="rounded-lg border border-[#1F4E79] px-6 py-2 font-medium text-[#1F4E79] transition hover:bg-slate-100"
      >
        Save Draft
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="rounded-lg bg-[#1F4E79] px-6 py-2 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default StepNavigation