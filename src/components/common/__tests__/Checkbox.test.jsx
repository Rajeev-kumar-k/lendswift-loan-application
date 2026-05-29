import { render, screen } from '@testing-library/react'
import Checkbox from '../Checkbox'

describe('Checkbox', () => {
  test('renders checkbox label', () => {
    render(
      <Checkbox
        label="Accept Terms"
      />
    )

    expect(
      screen.getByText(
        'Accept Terms'
      )
    ).toBeInTheDocument()
  })

  test('renders checkbox input', () => {
    render(
      <Checkbox
        label="Accept Terms"
      />
    )

    expect(
      screen.getByRole(
        'checkbox'
      )
    ).toBeInTheDocument()
  })
})