
describe(
  'Accessibility Audit',
  () => {
    beforeEach(() => {
      cy.clearLocalStorage()

      cy.visit(
        'http://localhost:5173'
      )

      cy.injectAxe()
    })

    it(
      'Step 1 should have no serious accessibility violations',
      () => {
        cy.checkA11y(
          null,
          {
            includedImpacts:
              [
                'critical',
                'serious',
              ],
          }
        )
      }
    )

    it(
      'Step 2 should have no serious accessibility violations',
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

        cy.injectAxe()

        cy.checkA11y(
          null,
          {
            includedImpacts:
              [
                'critical',
                'serious',
              ],
          }
        )
      }
    )

    it(
      'Step 3 should have no serious accessibility violations',
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

        cy.injectAxe()

        cy.checkA11y(
          null,
          {
            includedImpacts:
              [
                'critical',
                'serious',
              ],
          }
        )
      }
    )

    it(
      'Step 4 should have no serious accessibility violations',
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

        cy.injectAxe()

        cy.checkA11y(
          null,
          {
            includedImpacts:
              [
                'critical',
                'serious',
              ],
          }
        )
      }
    )

    
it(
  'Step 5 should have no serious accessibility violations',
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

    cy.injectAxe()

    cy.checkA11y(
      null,
      {
        includedImpacts:
          [
            'critical',
            'serious',
          ],
      }
    )
  }
)

it(
  'Step 7 should have no serious accessibility violations',
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

    cy.injectAxe()

   
cy.checkA11y(
  null,
  {
    includedImpacts: [
      'critical',
      'serious',
    ],
  },
  (violations) => {
    violations.forEach(
      (violation) => {
        cy.log(
          `RULE: ${violation.id}`
        )

        cy.log(
          `HELP: ${violation.help}`
        )

        violation.nodes.forEach(
          (node) => {
            cy.log(
              `TARGET: ${node.target}`
            )
          }
        )
      }
    )
  }
)


  }
)


it(
  'Step 6 should have no serious accessibility violations',
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

    cy.injectAxe()

   
cy.checkA11y(
  null,
  {
    includedImpacts: [
      'critical',
      'serious',
    ],
  },
  (violations) => {
    violations.forEach(
      (violation) => {
        cy.log(
          `RULE: ${violation.id}`
        )

        cy.log(
          `HELP: ${violation.help}`
        )

        violation.nodes.forEach(
          (node) => {
            cy.log(
              `TARGET: ${node.target}`
            )
          }
        )
      }
    )
  }
)


  }
)


it(
  'Step 8 should have no serious accessibility violations',
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

    cy.fillStep7()

    cy.contains(
      'Next'
    ).click({
      force: true,
    })

    cy.injectAxe()

    cy.checkA11y(
      null,
      {
        includedImpacts:
          [
            'critical',
            'serious',
          ],
      },
      (violations) => {
        violations.forEach(
          (
            violation
          ) => {
            cy.log(
              `RULE: ${violation.id}`
            )

            cy.log(
              `HELP: ${violation.help}`
            )

            violation.nodes.forEach(
              (node) => {
                cy.log(
                  `TARGET: ${node.target}`
                )
              }
            )
          }
        )
      }
    )
  }
)





  }
)

