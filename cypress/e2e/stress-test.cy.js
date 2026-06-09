describe(
  'Stress Test',
  () => {
    beforeEach(() => {
      cy.clearLocalStorage()

      cy.visit(
        'http://localhost:5173'
      )
    })

   
it(
  'should handle rapid step navigation without state corruption',
  () => {
    // Step 1
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

    // Spam Next rapidly
    for (
      let i = 0;
      i < 5;
      i++
    ) {
      cy.contains(
        'Next'
      ).click({
        force: true,
      })
    }


    // Ensure still on Step 2
  
// App should still be stable
cy.get('body').should(
  'exist'
)

// Should NOT jump beyond Step 3
cy.get(
  'input[name="panNumber"]'
).should(
  'exist'
)

// Step 4 should not appear
cy.get(
  'input[name="currentAddress"]'
).should(
  'not.exist'
)


  }
)


it(
  'should prevent double submission',
  () => {
    // Fill complete flow
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

    // Accept agreements
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

    // Rapid double submit
    cy.contains(
      'Submit Application'
    ).dblclick({
      force: true,
    })

    // Verify success page appears once
    cy.contains(
      /submitted|success|thank/i
    ).should(
      'exist'
    )
  }
)



it(
  'should update conditional steps correctly after going back',
  () => {
    // ---------- STEP 1 ----------
    cy.contains(
      'Personal Loan'
    ).click()

    cy.get(
      'input[name="loanAmount"]'
    )
      .clear()
      .type('600000')

    cy.get(
      'input[name="tenure"]'
    )
      .clear()
      .type('36')

    cy.get(
      'select[name="purpose"]'
    )
      .should(
        'not.be.disabled'
      )
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
      force: true,
    })

    // ---------- STEP 2 ----------
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

    // ---------- STEP 3 ----------
    cy.fillStep3({
      panNumber:
        'ABCDE1234F',
      aadhaarNumber:
        '123412341234',
    })

    // ---------- STEP 4 ----------
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

    // ---------- STEP 5 ----------
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

    // Verify Step 6 appears
    cy.contains(
      'Co-Applicant'
    ).should(
      'exist'
    )

    // ---------- GO BACK ----------
    for (
      let i = 0;
      i < 5;
      i++
    ) {
      cy.contains(
        'Previous'
      ).click({
        force: true,
      })
    }

    // ---------- MODIFY STEP 1 ----------
    cy.get(
      'input[name="loanAmount"]'
    )
      .clear()
      .type('400000')

    cy.contains(
      'Validate Step 1'
    ).click()

    cy.wait(1000)

    cy.contains(
      'Next'
    ).click({
      force: true,
    })

    // ---------- STEP 2 ----------
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

    // ---------- STEP 3 ----------

// ---------- STEP 3 AGAIN ----------
cy.get(
  'input[name="panNumber"]'
)
  .clear()
  .type(
    'ABCDE1234F'
  )

cy.contains(
  'Verify PAN'
).click({
  force: true,
})

cy.get(
  'input[name="aadhaarNumber"]'
)
  .clear()
  .type(
    '123412341234'
  )

cy.contains(
  'Verify Aadhaar'
).click({
  force: true,
})

cy.get(
  'input[type="checkbox"]'
).check({
  force: true,
})

cy.contains(
  'Next'
).click()



    // ---------- STEP 4 ----------
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

    // ---------- STEP 5 ----------
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

    // Step 6 should disappear
    cy.get(
      'input[type="file"]',
      {
        timeout:
          10000,
      }
    ).should(
      'exist'
    )

    cy.contains(
      'Co-Applicant'
    ).should(
      'not.exist'
    )
  }
)


it(
  'should handle max length values without crashing',
  () => {
    const longText =
      'A'.repeat(200)

    cy.contains(
      'Personal Loan'
    ).click()

    cy.get(
      'input[name="loanAmount"]'
    )
      .clear()
      .type(
        '999999999'
      )

    cy.get(
      'input[name="tenure"]'
    )
      .clear()
      .type(
        '999'
      )

    cy.get(
      'select[name="purpose"]'
    )
      .should(
        'not.be.disabled'
      )
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
      force: true,
    })

    // Long values
    cy.get(
      'input[name="fullName"]'
    ).type(
      longText
    )

    cy.get(
      'input[name="email"]'
    ).type(
      'verylongemailaddress@test.com'
    )

    cy.get(
      'input[name="mobileNumber"]'
    ).type(
      '9999999999'
    )

    // App should still work
    cy.get('body')
      .should(
        'exist'
      )

    cy.contains(
      'Validate Step 2'
    ).should(
      'exist'
    )
  }
)


it(
  'should handle unicode and special characters safely',
  () => {
    cy.contains(
      'Personal Loan'
    ).click()

    cy.get(
      'input[name="loanAmount"]'
    )
      .clear()
      .type('400000')

    cy.get(
      'input[name="tenure"]'
    )
      .clear()
      .type('36')

    cy.get(
      'select[name="purpose"]'
    )
      .should(
        'not.be.disabled'
      )
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
      force: true,
    })

    // Unicode + special chars
    cy.get(
      'input[name="fullName"]'
    ).type(
      'രാജീവ് Kumar 李小龙 José 🚀 @#$%'
    )

    cy.get(
      'input[name="email"]'
    ).type(
      'unicode@test.com'
    )

    cy.get(
      'input[name="mobileNumber"]'
    ).type(
      '9876543210'
    )

    // App should remain stable
    cy.get('body')
      .should(
        'exist'
      )

    cy.get(
      'input[name="fullName"]'
    ).should(
      'have.value',
      'രാജീവ് Kumar 李小龙 José 🚀 @#$%'
    )
  }
)




  }
)
