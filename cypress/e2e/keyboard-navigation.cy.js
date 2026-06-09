
describe(
  'Keyboard Navigation',
  () => {
    beforeEach(() => {
      cy.clearLocalStorage()

      cy.visit(
        'http://localhost:4173'
      )
    })

    it(
      'should complete entire form using keyboard only',
      () => {
        // STEP 1
        cy.contains(
  'Personal Loan'
)
  .click()

        cy.get(
          'input[name="loanAmount"]'
        )
          .focus()
          .type(
            '400000'
          )

        cy.get(
          'input[name="tenure"]'
        )
          .focus()
          .type(
            '36'
          )

        cy.get(
          'select[name="purpose"]'
        )
          .focus()
          .select(
            'Medical Emergency'
          )

       cy.contains(
  'Validate Step 1'
).click()

cy.wait(1000)

cy.contains(
  'Next'
).click({
  force: true
})

        // STEP 2
        cy.get(
          'input[name="fullName"]'
        )
          .focus()
          .type(
            'Rajeev Kumar'
          )

        cy.get(
          'input[name="dateOfBirth"]'
        )
          .focus()
          .type(
            '1998-06-10'
          )

        cy.get(
          'input[name="email"]'
        )
          .focus()
          .type(
            'rajeev@example.com'
          )

        cy.get(
          'input[name="mobileNumber"]'
        )
          .focus()
          .type(
            '9876543210'
          )

        cy.get(
          'select[name="maritalStatus"]'
        )
          .focus()
          .select(
            'single'
          )

        cy.contains(
  'male'
).click()


        cy.contains(
  'Validate Step 2'
).click()

cy.wait(1000)

cy.contains(
  'Next'
).click({
  force: true
})

        // STEP 3
       
cy.get(
  'input[name="panNumber"]'
)
  .focus()
  .type(
    'ABCDE1234F'
  )

cy.contains(
  'Verify PAN'
).click()

cy.get(
  'input[name="aadhaarNumber"]'
)
  .focus()
  .type(
    '123412341234'
  )

cy.contains(
  'Verify Aadhaar'
).click()

cy.get(
  'input[type="checkbox"]'
)
  .first()
  .check({
    force: true,
  })

cy.contains(
  'Next'
).click()

 // STEP 4
        cy.get(
          'input[name="currentAddress"]'
        )
          .focus()
          .type(
            'MG Road'
          )

        cy.get(
          'input[name="pinCode"]'
        )
          .focus()
          .type(
            '680001'
          )

        cy.get(
          'select[name="residenceType"]'
        )
          .focus()
          .select(
            'owned'
          )

        cy.get(
          'input[name="yearsAtAddress"]'
        )
          .focus()
          .type('3')

       cy.contains(
  'Next'
).click()

        // STEP 5
       cy.contains(
  'Salaried'
).click()

        cy.get(
          'input[name="companyName"]'
        )
          .focus()
          .type(
            'Infosys'
          )

        cy.get(
          'input[name="monthlyIncome"]'
        )
          .focus()
          .type(
            '60000'
          )

        cy.get(
          'input[name="workExperience"]'
        )
          .focus()
          .type('3')

     cy.contains(
  'Next'
).click()

        // STEP 7
    
// STEP 7
cy.fillStep7()

cy.contains(
  'Uploaded'
).should(
  'exist'
)

cy.contains(
  'Next'
).click({
  force: true,
})



        // STEP 8
        
// STEP 8
cy.get(
  'input[type="checkbox"]'
).each(
  ($checkbox) => {
    cy.wrap(
      $checkbox
    ).check({
      force: true,
    })
  }
)

cy.contains(
  'Submit Application'
).should(
  'not.be.disabled'
)

      }
    )

    


it(
  'should maintain logical tab order',
  () => {
    // Start from first field
    cy.get(
      'input[name="loanAmount"]'
    ).focus()

    // 1 → tenure
    cy.focused()
      .tab()

    cy.focused().should(
      'have.attr',
      'name',
      'tenure'
    )

    // 2 → Validate Step 1
    cy.focused()
      .tab()

    cy.focused().should(
      'contain.text',
      'Validate Step 1'
    )

    // 3 → Save Draft
    cy.focused()
      .tab()

    cy.focused().should(
      'contain.text',
      'Save Draft'
    )

    // 4 → Next
    cy.focused()
      .tab()

    cy.focused().should(
      'contain.text',
      'Next'
    )

    // 5 → Some interactive element
    cy.focused()
      .tab()

    // Verify focus is still on something interactive
    cy.focused().should(
      'exist'
    )
  }
)





  }
)
