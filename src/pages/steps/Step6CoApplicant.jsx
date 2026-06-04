import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Checkbox from '../../components/common/Checkbox'
import MaskedInput from '../../components/common/MaskedInput'
import useVerification from '../../hooks/useVerification'
import useLoanFormStore from '../../store/loanFormStore'

const relationshipOptions = [
  {
    label: 'Spouse',
    value: 'spouse',
  },
  {
    label: 'Parent',
    value: 'parent',
  },
  {
    label: 'Sibling',
    value: 'sibling',
  },
  {
    label:
      'Business Partner',
    value:
      'business-partner',
  },
]

function Step6CoApplicant() {
  const {
    updateStepData,
    getStepData,
  } = useLoanFormStore()

  const savedData =
    getStepData('step6')


  const step2Data =
  getStepData('step2')

const isMarried =
  step2Data?.maritalStatus ===
  'married'

  const {
    watch,
    setValue,
  } = useForm({
  defaultValues: {
    ...savedData,

    relationship:
      savedData?.relationship ||
      (isMarried
        ? 'spouse'
        : ''),
  },
})

  const [
    panNumber,
    setPanNumber,
  ] = useState(
    savedData
      ?.coApplicantPan ||
      ''
  )

  const panVerification =
    useVerification()

  const watchedValues =
    watch()

  const handleFieldChange =
    (field, value) => {
      setValue(
        field,
        value
      )

      updateStepData(
        'step6',
        {
          ...watch(),
          [field]:
            value,
        }
      )
    }

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
      <Input
        label="Co-Applicant Name"
        value={
          watchedValues.coApplicantName ||
          ''
        }
        onChange={(
          event
        ) =>
          handleFieldChange(
            'coApplicantName',
            event.target
              .value
          )
        }
      />

      <Select
        label="Relationship"
        options={
          relationshipOptions
        }
        value={
          watchedValues.relationship ||
          ''
        }
        onChange={(
          event
        ) =>
          handleFieldChange(
            'relationship',
            event.target
              .value
          )
        }
      />

      <div className="md:col-span-2">
        <MaskedInput
          label="Co-Applicant PAN"
          value={
            panNumber
          }
          maskType="pan"
          onChange={(
            value
          ) => {
            setPanNumber(
              value
            )

            handleFieldChange(
              'coApplicantPan',
              value
            )
          }}
          onBlur={() =>
            panVerification.verify(
              panNumber,
              'pan'
            )
          }
          error={
            panVerification.error
          }
          isMasked={
            panVerification.isVerified
          }
        />

        {panVerification.isVerifying && (
          <p className="text-amber-600">
            Verifying
            PAN...
          </p>
        )}

        {panVerification.isVerified && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Verified ✅
          </span>
        )}
      </div>

      <Input
        label="Co-Applicant Income"
        type="number"
        value={
          watchedValues.coApplicantIncome ||
          ''
        }
        onChange={(
          event
        ) =>
          handleFieldChange(
            'coApplicantIncome',
            event.target
              .value
          )
        }
      />

      <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Checkbox
          label="I consent to co-applicant verification and sharing of information."
          checked={
            watchedValues.coApplicantConsent ||
            false
          }
          onChange={(
            event
          ) =>
            handleFieldChange(
              'coApplicantConsent',
              event.target
                .checked
            )
          }
        />

        <Input
          label="Signature"
          placeholder="Type full name as signature"
          className="mt-4"
          value={
            watchedValues.signature ||
            ''
          }
          onChange={(
            event
          ) =>
            handleFieldChange(
              'signature',
              event.target
                .value
            )
          }
        />
      </div>
    </div>
  )
}

export default Step6CoApplicant