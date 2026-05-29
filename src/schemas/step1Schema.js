import { z } from 'zod'
import {
  LOAN_LIMITS,
  LOAN_PURPOSES,
} from '../constants/loanOptions'
import { calculateAge }
  from '../utils/calculateAge'

export const step1Schema = (
  dateOfBirth
) =>
  z
    .object({
      loanType: z
        .string()
        .min(
          1,
          'Please select loan type'
        ),

      loanAmount: z
        .string()
        .min(
          1,
          'Loan amount is required'
        ),

      tenure: z
        .string()
        .min(
          1,
          'Loan tenure is required'
        ),

      purpose: z
        .string()
        .min(
          1,
          'Please select loan purpose'
        ),
    })
    .superRefine(
      (data, context) => {
        const limits =
          LOAN_LIMITS[
            data.loanType
          ]

        if (!limits) {
          return
        }

        const amount =
          Number(
            data.loanAmount
          )

        const tenure =
          Number(data.tenure)

        if (
          amount <
            limits.minAmount ||
          amount >
            limits.maxAmount
        ) {
          context.addIssue({
            code: z
              .ZodIssueCode
              .custom,
            path: [
              'loanAmount',
            ],
            message: `Amount must be between ₹${limits.minAmount.toLocaleString(
              'en-IN'
            )} and ₹${limits.maxAmount.toLocaleString(
              'en-IN'
            )}`,
          })
        }

        if (
          tenure <
            limits.minTenure ||
          tenure >
            limits.maxTenure
        ) {
          context.addIssue({
            code: z
              .ZodIssueCode
              .custom,
            path: ['tenure'],
            message: `Tenure must be between ${limits.minTenure} and ${limits.maxTenure} months`,
          })
        }

        const validPurposes =
          LOAN_PURPOSES[
            data.loanType
          ] || []

        if (
          !validPurposes.includes(
            data.purpose
          )
        ) {
          context.addIssue({
            code: z
              .ZodIssueCode
              .custom,
            path: ['purpose'],
            message:
              'Invalid purpose for selected loan type',
          })
        }

        if (dateOfBirth) {
          const age =
            calculateAge(
              dateOfBirth
            )

          const tenureYears =
            tenure / 12

          if (
            age +
              tenureYears >
            65
          ) {
            context.addIssue({
              code: z
                .ZodIssueCode
                .custom,
              path: [
                'tenure',
              ],
              message:
                'Age + tenure cannot exceed 65 years',
            })
          }
        }
      }
    )