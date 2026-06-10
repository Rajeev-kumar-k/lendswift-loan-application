# LendSwift Architecture Documentation

## Overview

LendSwift follows a **Wizard Pattern Architecture** to manage a complex multi-step loan application workflow.

The architecture was designed to prioritize:

* Scalability
* Maintainability
* Accessibility
* Dynamic validation
* Reusability
* Responsive UX

The application supports:

* Personal Loan
* Home Loan
* Business Loan

through a shared but dynamic workflow.

---

# High-Level Architecture

The system is divided into:

```txt
UI Layer
→ Form Layer
→ Validation Layer
→ State Layer
→ Utility Layer
```

---

# Wizard Pattern

## Why Wizard Pattern?

A wizard-based flow was selected because the loan process contains multiple dependent stages and a large amount of user input.

Benefits:

* Reduces user overwhelm
* Improves completion rate
* Supports step-based validation
* Enables draft saving
* Allows cross-step dependency handling
* Simplifies complex forms

---

## Wizard Flow

The application contains 8 steps:

```txt
Step 1 → Loan Details
Step 2 → Personal Information
Step 3 → KYC Verification
Step 4 → Address
Step 5 → Employment
Step 6 → Co-Applicant
Step 7 → Document Upload & E-Signature
Step 8 → Review & Submission
```

Navigation is handled centrally inside:

```txt
src/components/navigation/Wizard.jsx
```

Responsibilities:

* Step rendering
* Navigation control
* Validation orchestration
* Progress tracking
* Step dependency management

---

# State Management

## Zustand Store

Global state management is handled using Zustand.

Location:

```txt
src/store/loanFormStore.js
```

Responsibilities:

* Persist step data
* Retrieve saved form values
* Cross-step communication
* Draft persistence

### Why Zustand?

Zustand was chosen because:

* Lightweight
* Minimal boilerplate
* Easier than Redux
* Better developer experience
* Fast performance

---

# Form Management

## React Hook Form

Each step uses React Hook Form for:

* Form state handling
* Validation triggering
* Controlled inputs
* Error management

### Why React Hook Form?

Chosen because:

* Better performance than Formik
* Less re-rendering
* Lightweight
* Excellent Zod integration
* Scales better for large forms

---

# Validation Layer

## Schema Factory Pattern

Validation uses a schema factory approach.

Location:

```txt
src/schemas/schemaFactory.js
```

Purpose:

Dynamically apply validation rules depending on:

* Loan type
* Employment type
* Conditional fields

Example:

Business loan validation differs from home loan validation.

Employment validation changes between:

* Salaried
* Self-employed
* Business owner

---

## Zod Validation

Zod is used for schema validation.

Why Zod?

* Cleaner syntax
* Better scalability
* Strong conditional validation
* Better developer experience

---

# Auto-Save Flow

The application supports draft auto-save.

Location:

```txt
src/hooks/useFormPersistence.js
```

Workflow:

```txt
User enters data
        ↓
Step data updates
        ↓
State saved to Zustand
        ↓
Persisted to Local Storage
        ↓
User refreshes page
        ↓
Draft restored
```

Benefits:

* Prevents data loss
* Resume incomplete forms
* Better UX

---

# Cross-Step Dependency Management

Some steps depend on data from previous steps.

Examples:

### Employment Type → Dynamic Fields

Step 5 dynamically changes fields based on:

```txt
Salaried
Self-employed
Business Owner
```

---

### Loan Type → Document Requirements

Step 7 document requirements change based on:

```txt
Personal Loan
Home Loan
Business Loan
```

---

### EMI Risk Consent

Step 8 calculates:

```txt
EMI > 50% of monthly income
```

If exceeded:

An additional consent checkbox becomes mandatory before submission.

---

# KYC Verification

Mock verification implemented for:

* PAN Verification
* Aadhaar Verification

Purpose:

Simulate real-world KYC flow without backend APIs.

---

# PIN Code Lookup

Mock PIN code lookup implemented.

Auto-populates:

* City
* State
* Post Office

Based on entered PIN code.

---

# Accessibility Strategy

Accessibility-first design approach used.

Implemented:

* ARIA labels
* Keyboard navigation
* Lighthouse accessibility optimization
* axe-core testing
* Accessible error messaging
* Color contrast compliance

---

# Testing Strategy

## Unit Testing

Using:

```txt
Vitest + Testing Library
```

Coverage includes:

* Common UI components
* Form behavior

---

## End-to-End Testing

Using:

```txt
Cypress
```

Coverage includes:

* Happy paths
* Validation errors
* Auto-save resume
* File uploads
* E-signature
* Accessibility
* Keyboard navigation
* Responsive behavior
* Stress testing

---

# Deployment

Hosted on:

```txt
Vercel
```

Supports:

* Continuous deployment from GitHub
* Automatic rebuilds
* Environment variable support

---

# Known Limitations

* Mock backend
* No authentication
* No database persistence
* Mock KYC APIs
* Mock PIN code lookup

---

# Future Improvements

* Real backend integration
* Real KYC APIs
* Database persistence
* Authentication system
* Email/SMS notifications
* Admin dashboard
