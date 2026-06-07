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
  }
)