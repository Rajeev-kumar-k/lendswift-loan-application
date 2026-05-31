import { useMemo, useState } from 'react'
import { steps } from '../../constants/steps'
import ProgressBar from './ProgressBar'
import StepNavigation from './StepNavigation'
import useLoanFormStore from '../../store/loanFormStore'

function Wizard() {
  const [currentStep, setCurrentStep] =
    useState(0)

  const { getStepData } =
    useLoanFormStore()

  const step1Data =
    getStepData('step1')

  const loanType =
    step1Data.loanType

  const loanAmount =
    Number(
      step1Data.loanAmount
    ) || 0

  const isCoApplicantRequired =
    useMemo(() => {
      if (
        loanType ===
          'personal' &&
        loanAmount >
          500000
      ) {
        return true
      }

      if (
        loanType === 'home'
      ) {
        return true
      }

      if (
        loanType ===
          'business' &&
        loanAmount >
          2000000
      ) {
        return true
      }

      return false
    }, [
      loanType,
      loanAmount,
    ])

  const filteredSteps =
    useMemo(() => {
      return steps.filter(
        (step) => {
          if (step.id === 6) {
            return isCoApplicantRequired
          }

          return true
        }
      )
    }, [
      isCoApplicantRequired,
    ])

  const CurrentStepComponent =
    filteredSteps[
      currentStep
    ].component

  const handleNext =
    () => {
      if (
        currentStep <
        filteredSteps.length -
          1
      ) {
        setCurrentStep(
          currentStep + 1
        )
      }
    }

  const handlePrevious =
    () => {
      if (
        currentStep > 0
      ) {
        setCurrentStep(
          currentStep - 1
        )
      }
    }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1F4E79]">
            LendSwift Loan
            Application
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your
            loan application
            securely
          </p>
        </div>

        <ProgressBar
          currentStep={
            currentStep
          }
          totalSteps={
            filteredSteps.length
          }
        />

        <div className="mb-8 flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8">
          <CurrentStepComponent />
        </div>

        <StepNavigation
          currentStep={
            currentStep
          }
          totalSteps={
            filteredSteps.length
          }
          onNext={
            handleNext
          }
          onPrevious={
            handlePrevious
          }
        />
      </div>
    </div>
  )
}

export default Wizard