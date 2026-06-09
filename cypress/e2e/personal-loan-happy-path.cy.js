describe(
  'Personal Loan Happy Path',
  () => {
    beforeEach(() => {
      cy.visit(
        'http://localhost:4173'
      )

      cy.fixture(
        'valid-personal-loan'
      ).as(
        'loanData'
      )
    })

    it(
      'should complete personal loan application successfully',
      function () {
        cy.fillStep1(
          this.loanData
            .step1
        )

        cy.fillStep2(
          this.loanData
            .step2
        )

        cy.fillStep3(
          this.loanData
            .step3
        )

        cy.fillStep4(
          this.loanData
            .step4
        )

        cy.fillStep5(
          this.loanData
            .step5
        )

        // Step 6 hidden
        cy.fillStep7()

        cy.fillStep8()
      }
    )
  }
)