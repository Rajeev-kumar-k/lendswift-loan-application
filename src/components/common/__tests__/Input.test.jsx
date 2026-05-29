import { render, screen } from '@testing-library/react'
import Input from '../Input'

describe('Input', () => {
  test('renders label correctly', () => {
    render(
      <Input
        label="Full Name"
        name="fullName"
      />
    )

    expect(
      screen.getByText(
        'Full Name'
      )
    ).toBeInTheDocument()
  })

  test('renders placeholder correctly', () => {
    render(
      <Input
        placeholder="Enter name"
        name="fullName"
      />
    )

    expect(
      screen.getByPlaceholderText(
        'Enter name'
      )
    ).toBeInTheDocument()
  })
})