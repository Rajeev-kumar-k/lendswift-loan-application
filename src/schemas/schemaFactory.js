import { step1Schema } from './Step1Schema'
import { step2Schema } from './Step2Schema'
import { step5Schema } from './Step5Schema'

function schemaFactory(
  step,
  formData
) {
  const loanType =
    formData?.step1
      ?.loanType

  const dob =
    formData?.step2
      ?.dateOfBirth

  switch (step) {
    case 'step1':
      return step1Schema(
        dob || '1990-01-01'
      ).superRefine(
        (
          data,
          context
        ) => {
          // Age + tenure <= 65
          if (
            dob &&
            data.tenure
          ) {
            const age =
              new Date().getFullYear() -
              new Date(
                dob
              ).getFullYear()

            const tenureYears =
              Number(
                data.tenure
              ) / 12

            if (
              age +
                tenureYears >
              65
            ) {
              context.addIssue(
                {
                  code:
                    'custom',
                  path: [
                    'tenure',
                  ],
                  message:
                    'Age + loan tenure cannot exceed 65 years',
                }
              )
            }
          }
        }
      )

    case 'step2':
      return step2Schema

    case 'step5':
      return step5Schema.superRefine(
        (
          data,
          context
        ) => {
          // Business loan restriction
          if (
            loanType ===
              'business' &&
            data.employmentType ===
              'salaried'
          ) {
            context.addIssue(
              {
                code:
                  'custom',
                path: [
                  'employmentType',
                ],
                message:
                  'Business loan applicants cannot be salaried employees',
              }
            )
          }
        }
      )

    default:
      return null
  }
}

export default schemaFactory