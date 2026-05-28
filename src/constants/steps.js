import Step1LoanDetails from '../pages/steps/Step1LoanDetails'
import Step2PersonalInfo from '../pages/steps/Step2PersonalInfo'
import Step3KYC from '../pages/steps/Step3KYC'
import Step4Address from '../pages/steps/Step4Address'
import Step5Employment from '../pages/steps/Step5Employment'
import Step6CoApplicant from '../pages/steps/Step6CoApplicant'
import Step7Documents from '../pages/steps/Step7Documents'
import Step8Review from '../pages/steps/Step8Review'

export const steps = [
  {
    id: 1,
    title: 'Loan Details',
    component: Step1LoanDetails,
  },
  {
    id: 2,
    title: 'Personal Info',
    component: Step2PersonalInfo,
  },
  {
    id: 3,
    title: 'KYC Verification',
    component: Step3KYC,
  },
  {
    id: 4,
    title: 'Address',
    component: Step4Address,
  },
  {
    id: 5,
    title: 'Employment',
    component: Step5Employment,
  },
  {
    id: 6,
    title: 'Co-Applicant',
    component: Step6CoApplicant,
  },
  {
    id: 7,
    title: 'Documents',
    component: Step7Documents,
  },
  {
    id: 8,
    title: 'Review & Submit',
    component: Step8Review,
  },
]