import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Greeting from '@/components/Greeting'

describe('Greeting', () => {
  it('renders nothing when typedText is empty and isTyping is false', () => {
    const { container } = render(
      <Greeting typedText="" isTyping={false} />
    )

    // Component should return null, so container should be empty
    expect(container.firstChild).toBeNull()
  })

  it('displays typedText when provided', () => {
    render(
      <Greeting typedText="Hello, World!" isTyping={false} />
    )

    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })

  it('shows cursor when isTyping is true', () => {
    render(
      <Greeting typedText="Hello" isTyping={true} />
    )

    // Check that the text is displayed
    expect(screen.getByText('Hello')).toBeInTheDocument()
    
    // Check that cursor is present
    const cursor = screen.getByText('|')
    expect(cursor).toBeInTheDocument()
    expect(cursor).toHaveClass('cursor')
  })

  it('hides cursor when isTyping is false', () => {
    render(
      <Greeting typedText="Hello, World!" isTyping={false} />
    )

    // Text should be displayed
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
    
    // Cursor should not be present
    expect(screen.queryByText('|')).not.toBeInTheDocument()
  })

  it('renders when isTyping is true even if typedText is empty', () => {
    render(
      <Greeting typedText="" isTyping={true} />
    )

    // Should render the container even if text is empty (cursor will show)
    const cursor = screen.getByText('|')
    expect(cursor).toBeInTheDocument()
    expect(cursor).toHaveClass('cursor')
  })
})
