describe(
  'Validation Errors',
  () => {
    beforeEach(() => {
      cy.visit(
        'http://localhost:5173'
      )
    })

    it(
      'Step 1 should show validation errors and clear after correction',
      () => {
        cy.contains(
          'Personal Loan'
        ).click()

        // Trigger blur validations
        cy.get(
          'input[name="loanAmount"]'
        )
          .focus()
          .blur()

        cy.get(
          'input[name="tenure"]'
        )
          .focus()
          .blur()

        cy.get(
          'select[name="purpose"]'
        )
          .focus()
          .blur()

        cy.contains(
          'Validate Step 1'
        ).click()

        // Verify errors appear
        cy.get(
          'p.text-\\[\\#E74C3C\\]'
        ).should(
          'have.length.at.least',
          2
        )

        // Correct values
        cy.get(
          'input[name="loanAmount"]'
        ).type(
          '400000'
        )

        cy.get(
          'input[name="tenure"]'
        ).type(
          '36'
        )

        cy.get(
          'select[name="purpose"]'
        ).select(
          'Medical Emergency'
        )

        // Errors should clear
        cy.get(
          'p.text-\\[\\#E74C3C\\]'
        ).should(
          'not.exist'
        )
      }
    )


    it(
  'Step 2 should show validation errors and clear after correction',
  () => {
    // Complete Step 1 first
    cy.fillStep1({
      loanType:
        'personal',
      loanAmount:
        '400000',
      tenure: '36',
      purpose:
        'Medical Emergency',
    })

    // Trigger validation
    cy.get(
      'input[name="fullName"]'
    )
      .focus()
      .blur()

    cy.get(
      'input[name="dateOfBirth"]'
    )
      .focus()
      .blur()

    cy.get(
      'input[name="email"]'
    )
      .focus()
      .blur()

    cy.get(
      'input[name="mobileNumber"]'
    )
      .focus()
      .blur()

    cy.contains(
      'Validate Step 2'
    ).click()

    // Errors should appear
    cy.get(
      'p.text-\\[\\#E74C3C\\]'
    ).should(
      'exist'
    )

    // Correct inputs
    cy.get(
      'input[name="fullName"]'
    ).type(
      'Rajeev Kumar'
    )

    cy.get(
      'input[name="dateOfBirth"]'
    ).type(
      '1998-06-10'
    )

    cy.get(
      'input[name="email"]'
    ).type(
      'rajeev@example.com'
    )

    cy.get(
      'input[name="mobileNumber"]'
    ).type(
      '9876543210'
    )

    cy.get(
      'input[name="alternateMobileNumber"]'
    ).type(
      '9876543211'
    )

    cy.get(
      'select[name="maritalStatus"]'
    ).select(
      'single'
    )

    cy.contains(
      'male',
      {
        matchCase:
          false,
      }
    ).click()

    // Errors clear
    cy.get(
      'p.text-\\[\\#E74C3C\\]'
    ).should(
      'not.exist'
    )
  }
)

it(
  'Step 3 should block navigation until PAN, Aadhaar and consent are provided',
  () => {
    cy.fillStep1({
      loanType:
        'personal',
      loanAmount:
        '400000',
      tenure: '36',
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

    // Try navigating empty
    cy.contains(
      'Next'
    ).click()

    // Should stay on Step 3
    cy.get(
      'input[name="panNumber"]'
    ).should(
      'exist'
    )

    // Fill PAN
    cy.get(
      'input[name="panNumber"]'
    ).type(
      'ABCDE1234F'
    )

    cy.contains(
      'Verify PAN'
    ).click()

    // Fill Aadhaar
    cy.get(
      'input[name="aadhaarNumber"]'
    ).type(
      '123412341234'
    )

    cy.contains(
      'Verify Aadhaar'
    ).click()

    // Give consent
    cy.get(
      'input[type="checkbox"]'
    ).check({
      force: true,
    })

    // Navigation should work now
    cy.contains(
      'Next'
    ).click()

    // Verify Step 4 opened
    cy.get(
      'input[name="currentAddress"]'
    ).should(
      'exist'
    )
  }
)

it(
  'Step 4 should validate address fields',
  () => {
    cy.fillStep1({
      loanType:
        'personal',
      loanAmount:
        '400000',
      tenure: '36',
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

    // Already on Step 4
    cy.get(
      'input[name="currentAddress"]'
    ).should(
      'exist'
    )

    // Empty navigation
    cy.contains(
      'Next'
    ).click()

    // Should stay on Step 4
    cy.get(
      'input[name="currentAddress"]'
    ).should(
      'exist'
    )

    // Fill values
    cy.get(
      'input[name="currentAddress"]'
    ).type(
      'MG Road'
    )

    cy.get(
      'input[name="pinCode"]'
    ).type(
      '680001'
    )

    cy.get(
      'select[name="residenceType"]'
    ).select(
      'owned'
    )

    cy.get(
      'input[name="yearsAtAddress"]'
    ).type('3')

    // Next works
    cy.contains(
      'Next'
    ).click()

    cy.contains(
      'Salaried'
    ).should(
      'exist'
    )
  }
)
it(
  'Step 5 should validate employment details',
  () => {
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

    // Already on Step 5
    cy.contains(
      'Salaried'
    ).should(
      'exist'
    )

    // Try empty navigation
    cy.contains(
      'Next'
    ).click()

    // Should remain on Step 5
    cy.contains(
      'Salaried'
    ).should(
      'exist'
    )

    // Fill employment data
    cy.contains(
      'Salaried'
    ).click()

    cy.get(
      'input[name="companyName"]'
    ).type(
      'Infosys'
    )

    cy.get(
      'input[name="monthlyIncome"]'
    ).type(
      '60000'
    )

    cy.get(
      'input[name="workExperience"]'
    ).type('3')

    // Next should work
    cy.contains(
      'Next'
    ).click({
      force: true,
    })

    // Step 7 opened
    cy.get(
      'input[type="file"]'
    ).should(
      'exist'
    )
  }
)


it(
  'Step 6 should validate co-applicant details',
  () => {
    cy.fillStep1({
      loanType:
        'personal',
      loanAmount:
        '600000',
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

    // Step 6 visible
    cy.contains(
      'Co-Applicant'
    ).should(
      'exist'
    )

    // Try empty navigation
    cy.contains(
      'Next'
    ).click()

    // Should remain on Step 6
    cy.contains(
      'Co-Applicant'
    ).should(
      'exist'
    )

    // Fill co-applicant details
    cy.contains(
      'Co-Applicant Name'
    )
      .parent()
      .find('input')
      .type(
        'Amit Kumar'
      )

    cy.contains(
      'Relationship'
    )
      .parent()
      .find('select')
      .select(
        'Sibling'
      )

    cy.contains(
      'Co-Applicant PAN'
    )
      .parent()
      .find('input')
      .type(
        'HCRPR6547D'
      )

    cy.contains(
      'Co-Applicant Income'
    )
      .parent()
      .find('input')
      .type(
        '45000'
      )

    cy.get(
      'input[type="checkbox"]'
    )
      .last()
      .check({
        force: true,
      })

    cy.contains(
      'Signature'
    )
      .parent()
      .find('input')
      .type(
        'Amit Kumar'
      )

    // Next should work
    cy.contains(
      'Next'
    ).click()

    // Step 7 opened
    cy.get(
      'input[type="file"]'
    ).should(
      'exist'
    )
  }
)


it(
  'Step 7 should validate documents and signature',
  () => {
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

    // Already on Step 7
    cy.get(
      'input[type="file"]'
    ).should(
      'exist'
    )

    // Try empty navigation
    cy.contains(
      'Next'
    ).click()

    // Should remain on Step 7
    cy.get(
      'input[type="file"]'
    ).should(
      'exist'
    )

    // Upload required docs
    cy.get(
      'input[type="file"]'
    ).each(
      ($input, index) => {
        const file =
          index === 4
            ? 'cypress/fixtures/sample.jpg'
            : 'cypress/fixtures/sample.pdf'

        cy.wrap(
          $input
        ).selectFile(
          file,
          {
            force:
              true,
          }
        )
      }
    )

    cy.contains(
      'Uploaded'
    ).should(
      'exist'
    )

    // Draw signature
    cy.get(
      'canvas'
    )
      .first()
      .realMouseDown({
        position:
          'center',
      })

    cy.get(
      'canvas'
    )
      .first()
      .realMouseMove(
        220,
        60
      )

    cy.get(
      'canvas'
    )
      .first()
      .realMouseMove(
        420,
        90
      )

    cy.get(
      'canvas'
    )
      .first()
      .realMouseUp()

    cy.wait(1000)

    // Next should work
    cy.contains(
      'Next'
    ).click({
      force: true,
    })

    // Step 8 loaded
    cy.contains(
      'Submit Application'
    ).should(
      'exist'
    )
  }
)
it(
  'Step 8 should block submission until agreements are checked',
  () => {
    cy.fillStep1({
      loanType:
        'personal',
      loanAmount:
        '400000',
      tenure: '36',
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

    cy.fillStep7()

    // Submit button should be disabled initially
    cy.contains(
      'Submit Application'
    ).should(
      'be.disabled'
    )

    // Check agreements
    cy.get(
      'input[type="checkbox"]'
    ).check({
      force: true,
    })

    // Submit should be enabled
    cy.contains(
      'Submit Application'
    ).should(
      'not.be.disabled'
    )
  }
)
  }
)