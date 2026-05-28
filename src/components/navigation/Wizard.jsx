import { useState } from 'react'
import { steps } from '../../constants/steps'

function Wizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage =
    ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1F4E79]">
            LendSwift Loan Application
          </h1>

          <p className="mt-2 text-slate-500">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <div className="mb-8">
          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#27AE60] transition-all duration-300"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-8 flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
          <CurrentStepComponent />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-lg bg-slate-300 px-6 py-2 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="rounded-lg bg-[#1F4E79] px-6 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Wizard