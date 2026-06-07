describe(
  'Auto Save & Resume',
  () => {
    it(
      'should restore saved form after reload',
      () => {

         cy.clearLocalStorage()

        cy.visit(
          'http://localhost:5173'
        )

        // Fill Step 1
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

        // Fill Step 2
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

        // Fill Step 3
        cy.fillStep3({
          panNumber:
            'ABCDE1234F',
          aadhaarNumber:
            '123412341234',
        })

        // Fill Step 4
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
        ).type(
          '3'
        )

        // Wait for autosave
        cy.wait(4000)

        // Simulate reopening
       cy.reload()

// wait for modal to appear
cy.contains(
  'Resume Previous Application?',
  { timeout: 10000 }
).should(
  'be.visible'
)

// click exact resume button
cy.contains(
  'button',
  'Resume'
).click()

// wait for step restoration
cy.get(
  'input[name="currentAddress"]',
  { timeout: 15000 }
).should(
  'exist'
)

cy.get(
  'input[name="currentAddress"]'
).should(
  'have.value',
  'MG Road'
)

cy.get(
  'input[name="pinCode"]'
).should(
  'have.value',
  '680001'
) }
    )
  }
)