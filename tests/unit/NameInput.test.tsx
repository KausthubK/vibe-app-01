import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NameInput from '@/components/NameInput'

describe('NameInput', () => {
  it('renders input and button', () => {
    const mockOnNameChange = vi.fn()
    const mockOnGo = vi.fn()

    render(
      <NameInput
        name=""
        onNameChange={mockOnNameChange}
        onGo={mockOnGo}
      />
    )

    // Check that input is present
    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('text-input')

    // Check that button is present
    const button = screen.getByRole('button', { name: /go/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('go-button')
  })

  it('displays current name prop value', () => {
    const mockOnNameChange = vi.fn()
    const mockOnGo = vi.fn()

    render(
      <NameInput
        name="John Doe"
        onNameChange={mockOnNameChange}
        onGo={mockOnGo}
      />
    )

    const input = screen.getByPlaceholderText('Enter your name') as HTMLInputElement
    expect(input.value).toBe('John Doe')
  })

  it('calls onNameChange when input changes', async () => {
    const user = userEvent.setup()
    const mockOnNameChange = vi.fn()
    const mockOnGo = vi.fn()

    render(
      <NameInput
        name=""
        onNameChange={mockOnNameChange}
        onGo={mockOnGo}
      />
    )

    const input = screen.getByPlaceholderText('Enter your name')
    const inputValue = 'Alice'
    await user.type(input, inputValue)

    // onNameChange should be called for each character
    expect(mockOnNameChange).toHaveBeenCalledTimes(inputValue.length) // 'A', 'l', 'i', 'c', 'e'
    expect(mockOnNameChange).toHaveBeenLastCalledWith(inputValue.charAt(inputValue.length - 1))
  })

  it('calls onGo when button clicked', async () => {
    const user = userEvent.setup()
    const mockOnNameChange = vi.fn()
    const mockOnGo = vi.fn()

    render(
      <NameInput
        name="Test User"
        onNameChange={mockOnNameChange}
        onGo={mockOnGo}
      />
    )

    const button = screen.getByRole('button', { name: /go/i })
    await user.click(button)

    expect(mockOnGo).toHaveBeenCalledTimes(1)
  })

  it('calls onGo when Enter key pressed', async () => {
    const user = userEvent.setup()
    const mockOnNameChange = vi.fn()
    const mockOnGo = vi.fn()

    render(
      <NameInput
        name="Test User"
        onNameChange={mockOnNameChange}
        onGo={mockOnGo}
      />
    )

    const input = screen.getByPlaceholderText('Enter your name')
    await user.type(input, '{Enter}')

    expect(mockOnGo).toHaveBeenCalledTimes(1)
  })
})
