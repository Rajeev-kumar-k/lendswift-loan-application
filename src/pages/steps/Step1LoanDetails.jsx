import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema } from '../../schemas/step1Schema'
import RadioGroup from '../../components/common/RadioGroup'
import CurrencyInput from '../../components/common/CurrencyInput'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import {
  LOAN_TYPES,
  LOAN_PURPOSES,
  LOAN_LIMITS,
} from '../../constants/loanOptions'
import useLoanFormStore from '../../store/loanFormStore'
import { useEffect } from 'react'

function Step1LoanDetails() {
  const {
    updateStepData,
    getStepData,
  } = useLoanFormStore()

  const savedData =
    getStepData('step1')

    
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      step1Schema(
        '1990-01-01'
      )
    ),
    mode: 'onChange',
    defaultValues:
      savedData,
  })

  useEffect(() => {
  reset(savedData)
}, [savedData, reset])


  const selectedLoanType =
    watch('loanType')

  const loanAmount =
    watch('loanAmount') ||
    ''

  const purposeOptions =
    selectedLoanType
      ? LOAN_PURPOSES[
          selectedLoanType
        ]?.map(
          (purpose) => ({
            label:
              purpose,
            value:
              purpose,
          })
        )
      : []

  const currentLimits =
    selectedLoanType
      ? LOAN_LIMITS[
          selectedLoanType
        ]
      : null

  const onSubmit = (
    data
  ) => {
    updateStepData(
      'step1',
      data
    )

    console.log(
      'Loan Details:',
      data
    )
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="grid w-full grid-cols-1 gap-5 md:grid-cols-2"
    >
      <div className="md:col-span-2">
        <RadioGroup
          label="Loan Type"
          name="loanType"
          options={
            LOAN_TYPES
          }
          direction="horizontal"
          selectedValue={
            selectedLoanType
          }
          onChange={(event) => {
            setValue(
              'loanType',
              event.target.value,
              {
                shouldValidate: true,
              }
            )
          }}  
          error={
            errors
              .loanType
              ?.message
          }
        />
      </div>

      <CurrencyInput
        label="Loan Amount"
        name="loanAmount"
        value={loanAmount}
        onChange={(
          value
        ) =>
          setValue(
            'loanAmount',
            value,
            {
              shouldValidate:
                true,
            }
          )
        }
        error={
          errors
            .loanAmount
            ?.message
        }
        helpText={
          currentLimits
            ? `Allowed range: ₹${currentLimits.minAmount.toLocaleString(
                'en-IN'
              )} - ₹${currentLimits.maxAmount.toLocaleString(
                'en-IN'
              )}`
            : ''
        }
      />

      <Input
        label="Tenure (Months)"
        name="tenure"
        type="number"
        placeholder="Enter tenure"
        error={
          errors.tenure
            ?.message
        }
        helpText={
          currentLimits
            ? `Allowed: ${currentLimits.minTenure} - ${currentLimits.maxTenure} months`
            : ''
        }
        {...register(
          'tenure'
        )}
      />

      <Select
        label="Loan Purpose"
        name="purpose"
        placeholder="Select purpose"
        options={
          purposeOptions
        }
        error={
          errors.purpose
            ?.message
        }
        disabled={
          !selectedLoanType
        }
        {...register(
          'purpose'
        )}
      />

      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-[#1F4E79] px-6 py-3 font-medium text-white"
        >
          Validate Step
          1
        </button>
      </div>
    </form>
  )
}

export default Step1LoanDetails