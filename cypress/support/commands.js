// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-real-events'

Cypress.Commands.add(
  'fillStep1',
  (data) => {
    const loanTypeLabel =
      data.loanType ===
      'personal'
        ? 'Personal Loan'
        : data.loanType ===
          'home'
        ? 'Home Loan'
        : 'Business Loan'

    cy.contains(
      loanTypeLabel
    ).click()

    cy.get(
      'input[name="loanAmount"]'
    )
      .clear()
      .type(
        data.loanAmount
      )

    cy.get(
      'input[name="tenure"]'
    )
      .clear()
      .type(
        data.tenure
      )

    cy.get(
      'select[name="purpose"]'
    ).select(
      data.purpose
    )

    cy.contains(
      'Validate Step 1'
    ).click()

    cy.wait(1000)

    cy.contains(
      'Next'
    ).click({
      force: true,
    })
  }
)

Cypress.Commands.add(
  'fillStep2',
  (data) => {
    cy.get(
      'input[name="fullName"]'
    ).type(
      `${data.firstName} ${data.lastName}`
    )

    cy.get(
      'input[name="dateOfBirth"]'
    ).type(
      data.dateOfBirth
    )

    cy.get(
      'input[name="email"]'
    ).type(
      data.email
    )

    cy.get(
      'input[name="mobileNumber"]'
    ).type(
      data.phoneNumber
    )

    cy.get(
      'input[name="alternateMobileNumber"]'
    ).type(
      '9876543211'
    )

    cy.get(
      'select[name="maritalStatus"]'
    ).select(
      data.maritalStatus
    )

    cy.contains(
      data.gender,
      {
        matchCase:
          false,
      }
    ).click()

    cy.contains(
      'Validate Step 2'
    ).click()

    cy.wait(1000)

    cy.contains(
      'Next'
    ).click({
      force: true,
    })
  }
)
Cypress.Commands.add(
  'fillStep3',
  (data) => {
    cy.get(
      'input[name="panNumber"]'
    ).type(
      data.panNumber
    )

    cy.contains(
      'Verify PAN'
    ).click()

    cy.get(
      'input[name="aadhaarNumber"]'
    ).type(
      data.aadhaarNumber
    )

    cy.contains(
      'Verify Aadhaar'
    ).click()

    cy.contains(
      'Next'
    ).click()
  }
)

Cypress.Commands.add(
  'fillStep4',
  (data) => {
    cy.get(
      'input[name="currentAddress"]'
    ).type(
      data.currentAddress
    )

    cy.get(
      'input[name="pinCode"]'
    ).type(
      data.pinCode
    )

    cy.get(
      'select[name="residenceType"]'
    ).select(
      data.residenceType
    )

    if (
      data.rentAmount
    ) {
      cy.get(
        'input[name="rentAmount"]'
      ).type(
        data.rentAmount
      )
    }

    cy.get(
      'input[name="yearsAtAddress"]'
    ).type(
      data.yearsAtAddress
    )

    cy.contains(
      'Next'
    ).click()
  }
)

Cypress.Commands.add(
  'fillStep5',
  (data) => {
    const employmentLabel =
      data.employmentType ===
      'salaried'
        ? 'Salaried'
        : data.employmentType ===
          'self-employed'
        ? 'Self Employed'
        : 'Business Owner'

    cy.contains(
      employmentLabel
    ).click()

    cy.wait(500)

    if (
      data.companyName
    ) {
      cy.get(
        'input[name="companyName"]'
      ).type(
        data.companyName
      )
    }

    if (
      data.businessName
    ) {
      cy.get(
        'input[name="businessName"]'
      ).type(
        data.businessName
      )
    }

    if (
      data.profession
    ) {
      cy.get(
        'input[name="profession"]'
      ).type(
        data.profession
      )
    }

    cy.get(
      'input[name="monthlyIncome"]'
    ).type(
      data.monthlyIncome
    )

    if (
      data.workExperience
    ) {
      cy.get(
        'input[name="workExperience"]'
      ).type(
        data.workExperience
      )
    }

    if (
      data.gstNumber
    ) {
      cy.get(
        'input[name="gstNumber"]'
      ).type(
        data.gstNumber
      )
    }

    if (
      data.yearsInBusiness
    ) {
      cy.get(
        'input[name="yearsInBusiness"]'
      ).type(
        data.yearsInBusiness
      )
    }

    cy.wait(500)

    cy.contains(
      'Next'
    ).click({
      force: true,
    })
  }
)
Cypress.Commands.add(
  'fillStep6',
  (data) => {
    if (!data) {
      cy.contains(
        'Next'
      ).click()

      return
    }

    cy.contains(
      'Co-Applicant Name'
    )
      .parent()
      .find('input')
      .type(
        data.coApplicantName
      )

    cy.contains(
      'Relationship'
    )
      .parent()
      .find('select')
      .select(
        data.relationship
      )

    cy.contains(
      'Co-Applicant Income'
    )
      .parent()
      .find('input')
      .type(
        data.coApplicantIncome
      )

    cy.contains(
      'I consent to co-applicant verification'
    )
      .parent()
      .find(
        'input[type="checkbox"]'
      )
      .check({
        force: true,
      })

    cy.contains(
      'Signature'
    )
      .parent()
      .find('input')
      .type(
        data.signature
      )

    cy.contains(
      'Next'
    ).click({
      force: true,
    })
  }
)

Cypress.Commands.add(
  'fillStep7',
  () => {

    // Upload all documents
   // Upload files properly for react-dropzone
cy.get('input[type="file"]')
  .each(($input) => {

    const accept =
      $input.attr(
        'accept'
      ) || ''

    const file =
      accept.includes(
        'image'
      ) &&
      !accept.includes(
        'pdf'
      )
        ? 'sample.jpg'
        : 'sample.pdf'

    cy.wrap($input)
      .selectFile(
        `cypress/fixtures/${file}`,
        {
          action:
            'drag-drop',
          force: true,
        }
      )
  })

// Wait for compression + state update
cy.wait(3000)
    // Verify uploads actually happened
    cy.contains(
      'Uploaded'
    ).should(
      'exist'
    )

    // Draw signature properly
    // Draw signature properly
cy.get('canvas')
  .first()
  .then(($canvas) => {
    const canvas =
      $canvas[0]

    const rect =
      canvas.getBoundingClientRect()

    cy.wrap(canvas)
      .realMouseDown({
        position:
          'center',
      })

    cy.wrap(canvas)
      .realMouseMove(
        rect.width *
          0.3,
        rect.height *
          0.3
      )

    cy.wrap(canvas)
      .realMouseMove(
        rect.width *
          0.6,
        rect.height *
          0.4
      )

    cy.wrap(canvas)
      .realMouseUp()
  })


    // Wait for onEnd → saveSignature
    cy.wait(3000)

    // Ensure signature warning disappears
    cy.contains(
      'Signature is required'
    ).should(
      'not.exist'
    )

    cy.contains(
      'Next'
    ).click({
      force: true,
    })
  }
)

Cypress.Commands.add(
  'fillStep8',
  () => {
    cy.get(
      'input[type="checkbox"]'
    ).check({
      force: true,
    })

    cy.wait(1000)

    cy.contains(
      'Submit Application'
    ).should(
      'not.be.disabled'
    )

    cy.contains(
      'Submit Application'
    ).click()

    cy.contains(
      'Application Submitted Successfully'
    ).should(
      'exist'
    )
  }
)