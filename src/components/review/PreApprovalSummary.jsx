import {
  calculateEMI,
  calculateTotalCost,
  calculateProcessingFee,
  formatIndianCurrency,
} from '../../utils/emiCalculator'

function PreApprovalSummary({
  loanAmount,
  tenureMonths,
  monthlyIncome,
  coApplicantIncome = 0,
}) {
  const emi =
    calculateEMI(
      loanAmount,
      10,
      tenureMonths
    )

  const {
    totalRepayment,
    totalInterest,
  } =
    calculateTotalCost(
      emi,
      tenureMonths,
      loanAmount
    )

  const processingFee =
    calculateProcessingFee(
      loanAmount
    )

  const totalIncome =
    Number(
      monthlyIncome || 0
    ) +
    Number(
      coApplicantIncome ||
        0
    )

  const emiRatio =
    totalIncome > 0
      ? (
          (emi /
            totalIncome) *
          100
        ).toFixed(1)
      : 0

  const exceedsLimit =
    emiRatio > 50

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-800">
        Pre-Approval
        Summary
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SummaryItem
          label="Loan Amount"
          value={formatIndianCurrency(
            loanAmount
          )}
        />

        <SummaryItem
          label="Monthly EMI"
          value={formatIndianCurrency(
            emi
          )}
        />

        <SummaryItem
          label="Processing Fee"
          value={formatIndianCurrency(
            processingFee
          )}
        />

        <SummaryItem
          label="Total Interest"
          value={formatIndianCurrency(
            totalInterest
          )}
        />

        <SummaryItem
          label="Total Repayment"
          value={formatIndianCurrency(
            totalRepayment
          )}
        />

        <SummaryItem
          label="EMI-to-Income Ratio"
          value={`${emiRatio}%`}
        />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
        {exceedsLimit ? (
          <p className="text-sm font-medium text-amber-700">
            ⚠ EMI exceeds
            50% of monthly
            income.
            Additional
            consent will be
            required before
            submission.
          </p>
        ) : (
          <p className="text-sm font-medium text-green-700">
            ✅ EMI appears
            affordable
            within income
            limits.
          </p>
        )}
      </div>
    </div>
  )
}

function SummaryItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default PreApprovalSummary