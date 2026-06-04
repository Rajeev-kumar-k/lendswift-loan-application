import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Checkbox from '../../components/common/Checkbox'
import PreApprovalSummary from '../../components/review/PreApprovalSummary'
import useLoanFormStore from '../../store/loanFormStore'
import {
  calculateEMI,
} from '../../utils/emiCalculator'


function Step8Review({
  goToStep,
}) {
  const { getStepData } =
    useLoanFormStore()

  const [
    submitted,
    setSubmitted,
  ] = useState(false)

  const [
    referenceNumber,
    setReferenceNumber,
  ] = useState('')

  const [
    consents,
    setConsents,
  ] = useState({
    accuracy: false,
    creditCheck: false,
    terms: false,
    communication:
      false,
    emiConsent:
      false,
  })

  const step1 =
    getStepData('step1')

  const step2 =
    getStepData('step2')

  const step3 =
    getStepData('step3')

  const step4 =
    getStepData('step4')

  const step5 =
    getStepData('step5')

  const step6 =
    getStepData('step6')

  const step7 =
    getStepData('step7')

  const monthlyIncome =
    Number(
      step5.monthlyIncome ||
        0
    )

  const coApplicantIncome =
    Number(
      step6.coApplicantIncome ||
        0
    )

  const residenceType =
  step4
    ?.residenceType

const monthlyRent =
  Number(
    step4?.rentAmount
  ) || 0

const applicantIncome =
  Number(
    step5
      ?.monthlyIncome
  ) || 0

const effectiveIncome =
  residenceType ===
  'rented'
    ? applicantIncome -
      monthlyRent
    : applicantIncome

const totalIncome =
  effectiveIncome +
  coApplicantIncome

  const loanAmount =
    Number(
      step1.loanAmount ||
        0
    )

  const tenure =
    Number(
      step1.tenure ||
        0
    )

const estimatedEMI =
  calculateEMI(
    loanAmount,
    tenure,
    step1.loanType
  )

  const exceedsRatio =
    totalIncome > 0
      ? estimatedEMI >
        totalIncome *
          0.5
      : false

  const mandatoryDocsUploaded =
    useMemo(() => {
      const required =
        [
          'aadhaarFront',
          'aadhaarBack',
          'bankStatement',
          'photo',
          'signature',
        ]

      if (
        !step3.panNumber
      ) {
        required.push(
          'panCard'
        )
      }

      if (
        step5.employmentType ===
        'salaried'
      ) {
        required.push(
          'salarySlips'
        )
      }

      if (
        step5.employmentType ===
          'self-employed' ||
        step5.employmentType ===
          'business-owner'
      ) {
        required.push(
          'itr'
        )
      }

      if (
        step1.loanType ===
        'home'
      ) {
        required.push(
          'propertyDocs'
        )
      }

      if (
        step1.loanType ===
        'business'
      ) {
        required.push(
          'businessCertificate',
          'gstReturns'
        )
      }

      return required.every(
        (
          document
        ) =>
          !!step7[
            document
          ]
      )
    }, [
      step1,
      step3,
      step5,
      step7,
    ])

  const allConsentsChecked =
    consents.accuracy &&
    consents.creditCheck &&
    consents.terms &&
    consents.communication &&
    (!exceedsRatio ||
      consents.emiConsent)

  const canSubmit =
    allConsentsChecked &&
    mandatoryDocsUploaded

  const handleConsent =
    (
      key,
      checked
    ) => {
      setConsents(
        (
          previous
        ) => ({
          ...previous,
          [key]:
            checked,
        })
      )
    }

  const handleSubmit =
    () => {
      const uuid =
        uuidv4()

      setReferenceNumber(
        uuid
      )

      setSubmitted(
        true
      )
    }

  return (
    <div className="w-full space-y-6">
      <PreApprovalSummary
  loanAmount={
    loanAmount
  }
  tenureMonths={
    tenure
  }
  monthlyIncome={
    effectiveIncome
  }
  coApplicantIncome={
    coApplicantIncome
  }
/>

     <ReviewSection
  title="Loan Details"
  data={step1}
  onEdit={() =>
    goToStep(0)
  }
/>

      <ReviewSection
  title="Personal Information"
  data={step2}
  onEdit={() =>
    goToStep(1)
  }
/>

      <ReviewSection
  title="KYC Details"
  data={step3}
  onEdit={() =>
    goToStep(2)
  }
/>

     <ReviewSection
  title="Address"
  data={step4}
  onEdit={() =>
    goToStep(3)
  }
/>

      <ReviewSection
  title="Employment"
  data={step5}
  onEdit={() =>
    goToStep(4)
  }
/>

      {Object.keys(
        step6 || {}
      ).length >
        0 && (
        <ReviewSection
  title="Co-Applicant"
  data={step6}
  onEdit={() =>
    goToStep(5)
  }
/>
      )}



      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-lg font-semibold">
      Uploaded Documents
    </h2>

    <button
      type="button"
      onClick={() =>
        goToStep(6)
      }
      className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100"
    >
      Edit
    </button>
  </div>

  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
    {[
      {
        key:
          'panCard',
        label:
          'PAN Card',
        required:
          !step3.panNumber,
      },
      {
        key:
          'aadhaarFront',
        label:
          'Aadhaar Front',
        required:
          true,
      },
      {
        key:
          'aadhaarBack',
        label:
          'Aadhaar Back',
        required:
          true,
      },
      {
        key:
          'bankStatement',
        label:
          'Bank Statement',
        required:
          true,
      },
      {
        key: 'photo',
        label:
          'Passport Photo',
        required:
          true,
      },
      ...(step5.employmentType ===
      'salaried'
        ? [
            {
              key:
                'salarySlips',
              label:
                'Salary Slips',
              required:
                true,
            },
          ]
        : []),

      ...(step5.employmentType ===
        'self-employed' ||
      step5.employmentType ===
        'business-owner'
        ? [
            {
              key:
                'itr',
              label:
                'ITR',
              required:
                true,
            },
          ]
        : []),

      ...(step1.loanType ===
      'home'
        ? [
            {
              key:
                'propertyDocs',
              label:
                'Property Documents',
              required:
                true,
            },
          ]
        : []),

      ...(step1.loanType ===
      'business'
        ? [
            {
              key:
                'businessCertificate',
              label:
                'Business Registration',
              required:
                true,
            },
            {
              key:
                'gstReturns',
              label:
                'GST Returns',
              required:
                true,
            },
          ]
        : []),
    ].map(
      (
        document
      ) => (
        <div
          key={
            document.key
          }
          className="rounded-lg border border-slate-200 bg-white p-3"
        >
          <p className="text-xs text-slate-500">
            {
              document.label
            }
          </p>

          <p
            className={`font-medium ${
              step7[
                document
                  .key
              ]
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {step7[
              document
                .key
            ]
              ? 'Uploaded ✅'
              : document.required
              ? 'Missing ❌'
              : 'Optional'}
          </p>
        </div>
      )
    )}
  </div>
</div>


      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="mb-4 text-lg font-semibold">
          E-Signature
        </h2>

        {step7.signature ? (
          <img
            src={
              step7.signature
            }
            alt="Signature"
            className="h-32 rounded border bg-white p-2"
          />
        ) : (
          <p>
            No signature
            uploaded
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="mb-5 text-lg font-semibold">
          Consents
        </h2>

        <div className="space-y-4">
          <Checkbox
            label="I confirm all information provided is accurate."
            checked={
              consents.accuracy
            }
            onChange={(
              event
            ) =>
              handleConsent(
                'accuracy',
                event.target
                  .checked
              )
            }
          />

          <Checkbox
            label="I authorise LendSwift to check my credit score via CIBIL/Equifax."
            checked={
              consents.creditCheck
            }
            onChange={(
              event
            ) =>
              handleConsent(
                'creditCheck',
                event.target
                  .checked
              )
            }
          />

          <Checkbox
            label="I agree to the Terms and Conditions."
            checked={
              consents.terms
            }
            onChange={(
              event
            ) =>
              handleConsent(
                'terms',
                event.target
                  .checked
              )
            }
          />

          <a
            href="#"
            className="text-blue-600 underline"
          >
            View Terms &
            Conditions
          </a>

          <Checkbox
            label="I consent to receive communications regarding this application."
            checked={
              consents.communication
            }
            onChange={(
              event
            ) =>
              handleConsent(
                'communication',
                event.target
                  .checked
              )
            }
          />

          {exceedsRatio && (
            <Checkbox
              label="I understand my EMI exceeds 50% of income and still wish to continue."
              checked={
                consents.emiConsent
              }
              onChange={(
                event
              ) =>
                handleConsent(
                  'emiConsent',
                  event.target
                    .checked
                )
              }
            />
          )}
        </div>
      </div>

      <button
        type="button"
        disabled={
          !canSubmit
        }
        onClick={
          handleSubmit
        }
        className={`w-full rounded-xl px-6 py-4 text-white ${
          canSubmit
            ? 'bg-[#1F4E79]'
            : 'cursor-not-allowed bg-slate-400'
        }`}
      >
        Submit
        Application
      </button>

      {submitted && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-2xl font-bold text-green-700">
            Application
            Submitted
            Successfully
            🎉
          </h2>

          <p className="mt-3">
            Reference
            Number:
          </p>

          <p className="font-mono text-lg font-semibold">
            {
              referenceNumber
            }
          </p>
        </div>
      )}
    </div>
  )
}

function ReviewSection({
  title,
  data,
  onEdit,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4 flex items-center justify-between">
  <h2 className="text-lg font-semibold">
    {title}
  </h2>

  <button
    type="button"
    onClick={
      onEdit
    }
    className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100"
  >
    Edit
  </button>
</div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Object.entries(
          data || {}
        ).map(
          ([
            key,
            value,
          ]) => (
            <div
              key={key}
              className="rounded-lg border border-slate-200 bg-white p-3"
            >
              <p className="text-xs text-slate-500">
                {key}
              </p>

              <p className="font-medium">
                {String(
                  value
                )}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Step8Review