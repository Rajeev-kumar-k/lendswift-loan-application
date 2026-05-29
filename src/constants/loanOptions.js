export const LOAN_TYPES = [
  {
    label: 'Personal Loan',
    value: 'personal',
  },
  {
    label: 'Home Loan',
    value: 'home',
  },
  {
    label: 'Business Loan',
    value: 'business',
  },
]

export const LOAN_PURPOSES = {
  personal: [
    'Medical Emergency',
    'Education',
    'Travel',
    'Wedding',
    'Debt Consolidation',
    'Other',
  ],

  home: [
    'Purchase Property',
    'Home Construction',
    'Renovation',
    'Plot Purchase',
  ],

  business: [
    'Business Expansion',
    'Working Capital',
    'Equipment Purchase',
    'Inventory',
    'Startup Funding',
  ],
}

export const LOAN_LIMITS = {
  personal: {
    minAmount: 50000,
    maxAmount: 2500000,
    minTenure: 12,
    maxTenure: 60,
  },

  home: {
    minAmount: 500000,
    maxAmount: 10000000,
    minTenure: 60,
    maxTenure: 360,
  },

  business: {
    minAmount: 100000,
    maxAmount: 5000000,
    minTenure: 12,
    maxTenure: 120,
  },
}