
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { steps } from '../../constants/steps'
import ProgressBar from './ProgressBar'
import StepNavigation from './StepNavigation'
import useLoanFormStore from '../../store/loanFormStore'
import useAutoSave from '../../hooks/useAutoSave'
import useFormPersistence from '../../hooks/useFormPersistence'

function Wizard() {
  const [
    currentStep,
    setCurrentStep,
  ] = useState(0)

  useEffect(() => {
    window.history.replaceState(
      {
        step: 0,
      },
      ''
    )
  }, [])

  useEffect(() => {
    const state =
      window.history.state

    if (
      state?.step !==
      currentStep
    ) {
      window.history.pushState(
        {
          step:
            currentStep,
        },
        ''
      )
    }
  }, [currentStep])

  useEffect(() => {
    const handlePopState =
      (event) => {
        if (
          event.state
            ?.step !==
          undefined
        ) {
          setCurrentStep(
            event.state
              .step
          )
        }
      }

    window.addEventListener(
      'popstate',
      handlePopState
    )

    return () =>
      window.removeEventListener(
        'popstate',
        handlePopState
      )
  }, [])

  const {
    saveMessage,
  } = useAutoSave(
    currentStep
  )

  const {
    showResumePrompt,
    resumeForm,
    startFresh,
  } =
    useFormPersistence(
      setCurrentStep
    )

  const {
    getStepData,
  } =
    useLoanFormStore()

  const step1Data =
    getStepData(
      'step1'
    )

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
        loanType ===
        'home'
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
          if (
            step.id ===
            6
          ) {
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
    const currentStepId =
      filteredSteps[
        currentStep
      ]?.id

    // STEP 3 VALIDATION
    if (
      currentStepId ===
      3
    ) {
      const step3Data =
        getStepData(
          'step3'
        )

      const hasPan =
        step3Data?.panNumber?.trim()

      const hasAadhaar =
        step3Data?.aadhaarNumber?.trim()

      const hasConsent =
        step3Data?.aadhaarConsent

      if (
        !hasPan ||
        !hasAadhaar ||
        !hasConsent
      ) {
        alert(
          'Please complete PAN, Aadhaar and consent before continuing'
        )

        return
      }
    }

    // STEP 4 VALIDATION
    if (
      currentStepId ===
      4
    ) {
      const step4Data =
        getStepData(
          'step4'
        )

      const hasAddress =
        step4Data?.currentAddress?.trim()

      const hasPinCode =
        step4Data?.pinCode?.trim()

      const hasResidenceType =
        step4Data?.residenceType

      const hasYearsAtAddress =
        step4Data?.yearsAtAddress?.trim()

      if (
        !hasAddress ||
        !hasPinCode ||
        !hasResidenceType ||
        !hasYearsAtAddress
      ) {
        alert(
          'Please complete address details before continuing'
        )

        return
      }
    }
// STEP 5 VALIDATION
if (
  currentStepId === 5
) {
  const step5Data =
    getStepData(
      'step5'
    )

  const employmentType =
    step5Data?.employmentType

  // Employment type required
  if (
    !employmentType
  ) {
    alert(
      'Please select employment type'
    )
    return
  }

  let isValid =
    false

  // Salaried
  if (
    employmentType ===
    'salaried'
  ) {
    isValid =
      !!step5Data?.companyName?.trim() &&
      !!step5Data?.monthlyIncome &&
      !!step5Data?.workExperience
  }

  // Self-employed
  if (
    employmentType ===
    'self-employed'
  ) {
    isValid =
      !!step5Data?.profession?.trim() &&
      !!step5Data?.monthlyIncome
  }

  // Business owner
  if (
    employmentType ===
    'business-owner'
  ) {
    isValid =
      !!step5Data?.businessName?.trim() &&
      !!step5Data?.gstNumber?.trim() &&
      !!step5Data?.monthlyIncome &&
      !!step5Data?.yearsInBusiness
  }
//step 5 validation
  if (!isValid) {
    alert(
      'Please complete employment details before continuing'
    )
    return
  }
}
   // STEP 6 VALIDATION
if (
  currentStepId === 6
) {
  const step6Data =
    getStepData(
      'step6'
    )

  const hasName =
    step6Data?.coApplicantName?.trim()

  const hasRelationship =
    step6Data?.relationship?.trim()

  const hasPan =
    step6Data?.coApplicantPan?.trim()

  // FIXED
  const hasIncome =
    step6Data?.coApplicantIncome

  const hasConsent =
    step6Data?.coApplicantConsent

  // Optional unless collected in this step
  // const hasSignature =
  //   step6Data?.signature?.trim()

  if (
    !hasName ||
    !hasRelationship ||
    !hasPan ||
    !hasIncome ||
    !hasConsent
  ) {
    alert(
      'Please complete co-applicant details before continuing'
    )

    return
  }
}
    // STEP 7 VALIDATION
    if (
      currentStepId ===
      7
    ) {
      const step7Data =
        getStepData(
          'step7'
        )

      const documents =
        step7Data?.documents ||
        {}

      const hasDocuments =
        Object.values(
          documents
        ).every(
          (doc) => !!doc
        )

      const hasSignature =
        step7Data?.signature

      if (
        !hasDocuments ||
        !hasSignature
      ) {
        alert(
          'Please upload documents and provide signature before continuing'
        )

        return
      }
    }

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
        currentStep >
        0
      ) {
        setCurrentStep(
          currentStep -
            1
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

        {showResumePrompt && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              Resume
              Previous
              Application?
            </h2>

            <p className="mt-2 text-slate-500">
              We found a
              saved
              application
              draft. Would
              you like to
              continue where
              you left off
              or start a new
              application?
            </p>

            <div className="mt-5 flex gap-4">
              <button
                onClick={
                  resumeForm
                }
                className="rounded-lg bg-[#1F4E79] px-5 py-2 font-medium text-white"
              >
                Resume
              </button>

              <button
                onClick={
                  startFresh
                }
                className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700"
              >
                Start Fresh
              </button>
            </div>
          </div>
        )}

        <ProgressBar
          currentStep={
            currentStep
          }
          totalSteps={
            filteredSteps.length
          }
        />

        {saveMessage && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 shadow-sm">
            {saveMessage}
          </div>
        )}

        <div className="mb-8 flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8">
          <CurrentStepComponent
            goToStep={
              setCurrentStep
            }
          />
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

