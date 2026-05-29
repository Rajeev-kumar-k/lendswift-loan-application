import { useState } from 'react'
import { steps } from '../../constants/steps'
import ProgressBar from './ProgressBar'
import StepNavigation from './StepNavigation'

function Wizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const CurrentStepComponent =
    steps[currentStep].component

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

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1F4E79]">
            LendSwift Loan Application
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your loan application securely
          </p>
        </div>

        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
        />

        <div className="mb-8 flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8">
          <CurrentStepComponent />
        </div>

        <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  )
}

export default Wizard