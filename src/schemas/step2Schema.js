import { z } from 'zod'

const calculateAge = (dob) => {
  const birthDate = new Date(dob)
  const today = new Date()

  let age =
    today.getFullYear() -
    birthDate.getFullYear()

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age -= 1
  }

  return age
}

export const step2Schema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(
        3,
        'Full name must be at least 3 characters'
      )
      .regex(
        /^[A-Za-z\s]+$/,
        'Only alphabets are allowed'
      ),

    dateOfBirth: z
      .string()
      .min(1, 'Date of birth is required'),

    email: z
      .string()
      .email(
        'Please enter a valid email'
      ),

    mobileNumber: z
      .string()
      .regex(
        /^[6-9]\d{9}$/,
        'Enter a valid mobile number'
      ),

    alternateMobileNumber: z
      .string()
      .regex(
        /^[6-9]\d{9}$/,
        'Enter a valid alternate mobile number'
      ),

    gender: z.string().min(
      1,
      'Please select gender'
    ),

    maritalStatus: z.string().min(
      1,
      'Please select marital status'
    ),
  })
  .refine(
    (data) =>
      data.mobileNumber !==
      data.alternateMobileNumber,
    {
      message:
        'Alternate mobile number must be different',
      path: [
        'alternateMobileNumber',
      ],
    }
  )
  .refine(
    (data) => {
      const age = calculateAge(
        data.dateOfBirth
      )

      return age >= 21 && age <= 60
    },
    {
      message:
        'Age must be between 21 and 60 years',
      path: ['dateOfBirth'],
    }
  )