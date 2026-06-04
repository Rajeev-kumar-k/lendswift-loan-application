export function calculateEMI(
  principal,
  annualInterestRate = 10,
  tenureMonths
) {
  const monthlyRate =
    annualInterestRate /
    12 /
    100

  const emi =
    (principal *
      monthlyRate *
      Math.pow(
        1 +
          monthlyRate,
        tenureMonths
      )) /
    (Math.pow(
      1 +
        monthlyRate,
      tenureMonths
    ) -
      1)

  return Number(
    emi.toFixed(2)
  )
}

export function calculateTotalCost(
  emi,
  tenureMonths,
  principal
) {
  const totalRepayment =
    emi *
    tenureMonths

  const totalInterest =
    totalRepayment -
    principal

  return {
    totalRepayment:
      Number(
        totalRepayment.toFixed(
          2
        )
      ),
    totalInterest:
      Number(
        totalInterest.toFixed(
          2
        )
      ),
  }
}

export function calculateProcessingFee(
  loanAmount
) {
  const fee =
    loanAmount * 0.02

  return Number(
    fee.toFixed(2)
  )
}

export function formatIndianCurrency(
  amount
) {
  return new Intl.NumberFormat(
    'en-IN',
    {
      style:
        'currency',
      currency:
        'INR',
      maximumFractionDigits: 0,
    }
  ).format(amount)
}