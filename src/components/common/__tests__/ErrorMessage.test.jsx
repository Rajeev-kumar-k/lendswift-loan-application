import { render, screen } from '@testing-library/react'
import ErrorMessage from '../ErrorMessage'

describe('ErrorMessage', () => {
  test('renders error message', () => {
    render(
      <ErrorMessage message="Required field" />
    )

    expect(
      screen.getByText(
        'Required field'
      )
    ).toBeInTheDocument()
  })

  test('does not render when message is empty', () => {
    render(<ErrorMessage message="" />)

    expect(
      screen.queryByRole('alert')
    ).not.toBeInTheDocument()
  })
})