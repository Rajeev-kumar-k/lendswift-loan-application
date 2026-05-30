import { z } from 'zod'

const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/

const salariedSchema =
  z.object({
    employmentType:
      z.literal(
        'salaried'
      ),

    companyName: z
      .string()
      .min(
        2,
        'Company name is required'
      ),

    monthlyIncome: z
      .number({
        required_error:
          'Monthly income is required',
      })
      .min(
        10000,
        'Income must be at least ₹10,000'
      ),

    workExperience: z
      .number({
        required_error:
          'Work experience is required',
      })
      .min(
        0,
        'Experience cannot be negative'
      ),
  })

const selfEmployedSchema =
  z.object({
    employmentType:
      z.literal(
        'self-employed'
      ),

    profession: z
      .string()
      .min(
        2,
        'Profession is required'
      ),

    monthlyIncome: z
      .number({
        required_error:
          'Monthly income is required',
      })
      .min(
        10000,
        'Income must be at least ₹10,000'
      ),

    itrFiled:
      z.boolean(),
  })

const businessOwnerSchema =
  z.object({
    employmentType:
      z.literal(
        'business-owner'
      ),

    businessName: z
      .string()
      .min(
        2,
        'Business name is required'
      ),

    gstNumber: z
      .string()
      .regex(
        gstRegex,
        'Invalid GST number'
      ),

    monthlyIncome: z
      .number({
        required_error:
          'Monthly income is required',
      })
      .min(
        10000,
        'Income must be at least ₹10,000'
      ),

    yearsInBusiness:
      z.number({
        required_error:
          'Years in business required',
      })
        .min(
          1,
          'Minimum 1 year required'
        ),
  })

export const step5Schema =
  (loanType) =>
    z
      .discriminatedUnion(
        'employmentType',
        [
          salariedSchema,
          selfEmployedSchema,
          businessOwnerSchema,
        ]
      )
      .optional()
      .superRefine(
        (
          data,
          context
        ) => {
          if (!data) return

          if (
            loanType ===
              'business' &&
            data.employmentType ===
              'salaried'
          ) {
            context.addIssue({
              code: z
                .ZodIssueCode
                .custom,
              path: [
                'employmentType',
              ],
              message:
                'Business loan applicants cannot be salaried employees',
            })
          }
        }
      )