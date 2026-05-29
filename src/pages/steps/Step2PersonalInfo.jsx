import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema } from '../../schemas/step2Schema'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import RadioGroup from '../../components/common/RadioGroup'

const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const maritalStatusOptions = [
  {
    label: 'Single',
    value: 'single',
  },
  {
    label: 'Married',
    value: 'married',
  },
  {
    label: 'Divorced',
    value: 'divorced',
  },
]

function Step2PersonalInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      step2Schema
    ),
    mode: 'onChange',
  })

  

  const onSubmit = (data) => {
    console.log(
      'Personal Info:',
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
      <Input
        label="Full Name"
        name="fullName"
        placeholder="Enter full name"
        error={
          errors.fullName?.message
        }
        {...register('fullName')}
      />

      <Input
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        error={
          errors.dateOfBirth
            ?.message
        }
        {...register(
          'dateOfBirth'
        )}
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter email"
        error={
          errors.email?.message
        }
        {...register('email')}
      />

      <Input
        label="Mobile Number"
        name="mobileNumber"
        placeholder="Enter mobile number"
        error={
          errors.mobileNumber
            ?.message
        }
        {...register(
          'mobileNumber'
        )}
      />

      <Input
        label="Alternate Mobile"
        name="alternateMobileNumber"
        placeholder="Enter alternate mobile"
        error={
          errors
            .alternateMobileNumber
            ?.message
        }
        {...register(
          'alternateMobileNumber'
        )}
      />

      <Select
        label="Marital Status"
        name="maritalStatus"
        placeholder="Select status"
        options={
          maritalStatusOptions
        }
        error={
          errors.maritalStatus
            ?.message
        }
        {...register(
          'maritalStatus'
        )}
      />

      <div className="md:col-span-2">
       <RadioGroup
        label="Gender"
        name="gender"
        direction="horizontal"
        options={genderOptions}
        error={
          errors.gender?.message
        }
        register={register}
      />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-[#1F4E79] px-6 py-3 font-medium text-white"
        >
          Validate Step 2
        </button>
      </div>
    </form>
  )
}

export default Step2PersonalInfo