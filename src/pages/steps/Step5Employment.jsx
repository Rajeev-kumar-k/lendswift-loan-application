import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import RadioGroup from '../../components/common/RadioGroup'
import Input from '../../components/common/Input'
import Checkbox from '../../components/common/Checkbox'
import { step5Schema } from '../../schemas/step5Schema'
import useLoanFormStore from '../../store/loanFormStore'

const employmentOptions = [
  {
    label: 'Salaried',
    value: 'salaried',
  },
  {
    label:
      'Self Employed',
    value:
      'self-employed',
  },
  {
    label:
      'Business Owner',
    value:
      'business-owner',
  },
]

function Step5Employment() {
  const {
    updateStepData,
    getStepData,
  } = useLoanFormStore()

  const savedData =
    getStepData('step5')

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(
        step5Schema
      ),
    mode: 'onChange',
    defaultValues:
      savedData,
  })

  const employmentType =
    watch(
      'employmentType'
    )

  const watchedValues =
  watch()

useEffect(() => {
  const subscription =
    watch((value) => {
      updateStepData(
        'step5',
        value
      )
    })

  return () =>
    subscription.unsubscribe()
}, [watch, updateStepData])

  return (
    <div className="space-y-6">
      <RadioGroup
        label="Employment Type"
        name="employmentType"
        direction="horizontal"
        options={
          employmentOptions
        }
        register={register}
        error={
          errors
            .employmentType
            ?.message
        }
      />

      {employmentType ===
        'salaried' && (
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Company Name"
            {...register(
              'companyName'
            )}
            error={
              errors
                .companyName
                ?.message
            }
          />

          <Input
            label="Monthly Income"
            type="number"
            {...register(
              'monthlyIncome',
              {
                valueAsNumber: true,
              }
            )}
            error={
              errors
                .monthlyIncome
                ?.message
            }
          />

          <Input
            label="Work Experience (Years)"
            type="number"
            {...register(
              'workExperience',
              {
                valueAsNumber: true,
              }
            )}
            error={
              errors
                .workExperience
                ?.message
            }
          />
        </div>
      )}

      {employmentType ===
        'self-employed' && (
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Profession"
            {...register(
              'profession'
            )}
            error={
              errors
                .profession
                ?.message
            }
          />

          <Input
            label="Monthly Income"
            type="number"
            {...register(
              'monthlyIncome',
              {
                valueAsNumber: true,
              }
            )}
            error={
              errors
                .monthlyIncome
                ?.message
            }
          />

          <div className="md:col-span-2">
            <Checkbox
              label="ITR Filed"
              {...register(
                'itrFiled'
              )}
            />
          </div>
        </div>
      )}

      {employmentType ===
        'business-owner' && (
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Business Name"
            {...register(
              'businessName'
            )}
            error={
              errors
                .businessName
                ?.message
            }
          />

          <Input
            label="GST Number"
            {...register(
              'gstNumber'
            )}
            error={
              errors
                .gstNumber
                ?.message
            }
          />

          <Input
            label="Monthly Income"
            type="number"
            {...register(
              'monthlyIncome',
              {
                valueAsNumber: true,
              }
            )}
            error={
              errors
                .monthlyIncome
                ?.message
            }
          />

          <Input
            label="Years in Business"
            type="number"
            {...register(
              'yearsInBusiness',
              {
                valueAsNumber: true,
              }
            )}
            error={
              errors
                .yearsInBusiness
                ?.message
            }
          />
        </div>
      )}
    </div>
  )
}

export default Step5Employment