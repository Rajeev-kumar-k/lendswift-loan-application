# LendSwift Loan Application Wizard

A production-ready multi-step loan application wizard built using **React + Vite**, featuring dynamic validation, accessibility compliance, auto-save draft functionality, responsive UI, and comprehensive testing.

## Live Demo

Deployed Application:

https://lendswift-loan-application-three.vercel.app/

## GitHub Repository

https://github.com/Rajeev-kumar-k/lendswift-loan-application

---

## Project Overview

LendSwift is a responsive, accessible, multi-step loan application system that supports:

* Personal Loan
* Home Loan
* Business Loan

The application guides users through a structured loan journey with:

* Dynamic form rendering
* Cross-step validation
* Conditional fields
* KYC verification
* Document uploads
* E-signature support
* Pre-approval summary
* Auto-save & resume
* Accessibility compliance

---

## Features

### Multi-Step Wizard Flow

8-step loan application journey:

1. Loan Details
2. Personal Information
3. KYC Verification
4. Address Details
5. Employment Details
6. Co-Applicant Details
7. Document Upload & E-Signature
8. Review & Submission

---

### Dynamic Loan Types

Supports:

* Personal Loan
* Home Loan
* Business Loan

Each loan type has:

* Different validation logic
* Dynamic document requirements
* Conditional rendering

---

### Dynamic Employment Flow

Supports:

* Salaried
* Self-employed
* Business Owner

Each employment type dynamically renders relevant fields and validations.

---

### KYC Verification

Mock verification implemented for:

* PAN Verification
* Aadhaar Verification

---

### Address Validation

Mock PIN code lookup implemented to auto-populate:

* City
* State
* Post Office

---

### Auto Save & Resume

Application progress is automatically saved to local storage.

Users can:

* Resume draft
* Continue incomplete applications
* Restore progress after refresh

---

### Document Upload

Dynamic upload requirements based on:

* Loan type
* Employment type
* KYC status

Supported uploads include:

* PAN card
* Aadhaar front/back
* Salary slips
* ITR
* Property documents
* GST returns
* Passport photo
* Bank statement

---

### E-Signature

Users can digitally sign using a signature pad before submission.

---

### EMI Risk Validation

If:

```txt
EMI > 50% of monthly income
```

The system requires additional user consent before allowing submission.

---

## Accessibility

Accessibility was prioritized throughout development.

Completed:

* Lighthouse Accessibility Audit (90+ target achieved)
* axe-core testing via Cypress
* ARIA labels on form inputs
* Keyboard navigation testing
* Error accessibility support
* Color contrast verification

### Lighthouse Score

* Performance: 99
* Accessibility: 98
* Best Practices: 100

---

## Responsive Testing

Tested across:

* 320px
* 375px
* 414px
* 768px
* 1024px
* 1440px
* 1920px

Browsers tested:

* Chrome
* Edge
* Firefox

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS

### Form Management

* React Hook Form

### Validation

* Zod

### State Management

* Zustand

### Testing

* Cypress
* Cypress Axe
* Vitest
* Testing Library

### Utilities

* UUID
* React Dropzone
* React Signature Canvas

---

## Why These Architectural Decisions?

### Why Wizard Pattern?

The wizard pattern was chosen because:

* Complex forms become easier to manage
* Improves completion rate
* Reduces user overwhelm
* Allows step-based validation
* Enables auto-save functionality

---

### Why React Hook Form over Formik?

React Hook Form was selected because:

* Better performance
* Less re-rendering
* Lightweight
* Easier integration with Zod
* Better scalability for large forms

---

### Why Zod over Yup?

Zod was selected because:

* Better TypeScript support
* Cleaner schema validation
* Easier conditional validation
* Stronger developer experience

---

## Installation & Setup

Clone repository:

```bash
git clone https://github.com/Rajeev-kumar-k/lendswift-loan-application.git
```

Move into project:

```bash
cd lendswift-loan-application
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Build Project

```bash
npm run build
```

---

## Run Lint

```bash
npm run lint
```

---

## Run Tests

Open Cypress:

```bash
npx cypress open
```

Run headless tests:

```bash
npx cypress run
```

---

## Screenshots

### Desktop

Add screenshots from:

```txt
README-assets/desktop/
```

### Mobile

Add screenshots from:

```txt
README-assets/mobile/
```

---

## Known Limitations

* Mock backend only
* Mock PAN/Aadhaar verification
* Mock PIN code lookup
* No authentication system
* No backend persistence/database
* No real API integrations

---

## Future Improvements

* Real KYC API integration
* Backend persistence
* Authentication
* Email/SMS notifications
* Real-time loan eligibility APIs
* Admin dashboard

---

## Author

Rajeev Kumar
