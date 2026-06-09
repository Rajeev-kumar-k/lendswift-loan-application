describe(
  'Responsive Design Tests',
  () => {
  const viewports = [
  [320, 568],
  [375, 667],
  [414, 896],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
]

    viewports.forEach(
      ([width, height]) => {
        it(
          `should render properly on ${width}x${height}`,
          () => {
            cy.viewport(
              width,
              height
            )

            cy.visit('http://localhost:5173')

            // Wait for app to load
            cy.wait(2000)

            // Ensure body loaded
            cy.get('body')
              .should(
                'exist'
              )

            // Loan options should exist
            cy.contains(
              'Personal Loan',
              {
                timeout: 10000,
              }
            )
              .scrollIntoView()
              .should(
                'exist'
              )

            cy.contains(
              'Home Loan',
              {
                timeout: 10000,
              }
            )
              .scrollIntoView()
              .should(
                'exist'
              )

            cy.contains(
              'Business Loan',
              {
                timeout: 10000,
              }
            )
              .scrollIntoView()
              .should(
                'exist'
              )

            // Form inputs exist
            cy.get(
              'input[name="loanAmount"]'
            ).should(
              'exist'
            )

            cy.get(
              'input[name="tenure"]'
            ).should(
              'exist'
            )

            cy.get(
              'select[name="purpose"]'
            ).should(
              'exist'
            )

            // Page should not overflow horizontally
          cy.window().then((win) => {
  const scrollWidth =
    win.document.documentElement
      .scrollWidth

  cy.log(
    `Viewport: ${win.innerWidth}`
  )

  cy.log(
    `Scroll Width: ${scrollWidth}`
  )

  // Allow small tolerance for browser rounding
  expect(scrollWidth).to.be.lte(
    win.innerWidth + 50
  )
})
          }
        )
      }
    )
  }
)