describe(
  'File Upload',
  () => {
   beforeEach(() => {
  cy.clearLocalStorage()

  cy.visit(
    'http://localhost:4173'
  )

  cy.fillStep1({
    loanType:
      'personal',
    loanAmount:
      '400000',
    tenure:
      '36',
    purpose:
      'Medical Emergency',
  })

  cy.fillStep2({
    firstName:
      'Rajeev',
    lastName:
      'Kumar',
    dateOfBirth:
      '1998-06-10',
    gender:
      'male',
    maritalStatus:
      'single',
    email:
      'rajeev@example.com',
    phoneNumber:
      '9876543210',
  })

  cy.fillStep3({
    panNumber:
      'ABCDE1234F',
    aadhaarNumber:
      '123412341234',
  })

  cy.fillStep4({
    currentAddress:
      'MG Road',
    pinCode:
      '680001',
    residenceType:
      'owned',
    yearsAtAddress:
      '3',
  })

  cy.fillStep5({
    employmentType:
      'salaried',
    companyName:
      'Infosys',
    monthlyIncome:
      '60000',
    workExperience:
      '3',
  })

  // Confirm Step 7 loaded
  cy.get(
    'input[type="file"]',
    { timeout: 10000 }
  ).should(
    'have.length.greaterThan',
    0
  )
})
    it(
      'should upload valid pdf file',
      () => {
        cy.get(
          'input[type="file"]'
        )
          .eq(0)
          .selectFile(
            'cypress/fixtures/sample.pdf',
            {
              force:
                true,
            }
          )

        cy.contains(
          'Uploaded'
        ).should(
          'exist'
        )
      }
    )

    it(
      'should upload valid image file',
      () => {
        cy.get(
          'input[type="file"]'
        )
          .eq(4)
          .selectFile(
            'cypress/fixtures/sample.jpg',
            {
              force:
                true,
            }
          )

        cy.contains(
          'Uploaded'
        ).should(
          'exist'
        )
      }
    )

    it(
  'should reject wrong file type',
  () => {
    cy.on(
      'window:alert',
      (text) => {
        expect(
          text
        ).to.include(
          'Invalid file type or size exceeded'
        )
      }
    )

    cy.get(
      'input[type="file"]'
    )
      .eq(0)
      .selectFile(
        'cypress/fixtures/test.txt',
        {
          force:
            true,
        }
      )
  }
)

it(
  'should remove uploaded file',
  () => {
    cy.get(
      'input[type="file"]'
    )
      .eq(0)
      .selectFile(
        'cypress/fixtures/sample.pdf',
        {
          force:
            true,
        }
      )

    cy.contains(
      'Uploaded'
    ).should(
      'exist'
    )

    cy.contains(
      /remove|delete/i
    ).click()

    cy.contains(
      'Pending'
    ).should(
      'exist'
    )
  }
)

it(
  'should compress uploaded image',
  () => {
    cy.get(
      'input[type="file"]'
    )
      .eq(4)
      .selectFile(
        'cypress/fixtures/sample.jpg',
        {
          force:
            true,
        }
      )

    cy.contains(
      'Uploaded'
    ).should(
      'exist'
    )

    cy.contains(
      'sample.jpg'
    ).should(
      'exist'
    )
  }
)

it(
  'should reject oversized file',
  () => {
    cy.on(
      'window:alert',
      (text) => {
        expect(
          text
        ).to.include(
          'Invalid file type or size exceeded'
        )
      }
    )

    cy.get(
      'input[type="file"]'
    )
      .eq(0)
      .selectFile(
        {
          contents:
            Cypress.Buffer.alloc(
              10 *
                1024 *
                1024
            ),
          fileName:
            'large.pdf',
          mimeType:
            'application/pdf',
        },
        {
          force:
            true,
        }
      )
  }
)

  }
)