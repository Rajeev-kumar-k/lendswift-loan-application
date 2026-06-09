describe(
  'E-Signature',
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

      // Upload all required files
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
    })

    it(
      'should draw signature',
      () => {
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

        cy.wait(2000)

        cy.contains(
          'Signature is required'
        ).should(
          'not.exist'
        )
      }
    )

    it(
      'should clear signature',
      () => {
        // Draw signature first
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

        // Clear signature
        cy.contains(
          /clear/i
        ).click()

        cy.contains(
          'Signature is required'
        ).should(
          'exist'
        )
      }
    )

    it(
      'should show signature in review page',
      () => {
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

        cy.wait(2000)

        // Proceed to review step
        cy.contains(
          'Next'
        ).click({
          force:
            true,
        })

        // Verify Step 8 loaded
        cy.contains(
          'Submit Application'
        ).should(
          'exist'
        )

        // Signature should appear
        cy.get('img')
          .should(
            'have.length.greaterThan',
            0
          )
      }
    )
  }
)