describe(
  'Home Loan Happy Path',
  () => {
    beforeEach(() => {
      cy.visit(
        'http://localhost:5173'
      )

      cy.fixture(
        'valid-home-loan'
      ).as(
        'loanData'
      )
    })

    it(
      'should complete home loan application successfully',
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

       
        cy.fillStep6(
          this.loanData
            .step6
        )

        cy.fillStep7()

        cy.fillStep8()
      }
    )
  }
)