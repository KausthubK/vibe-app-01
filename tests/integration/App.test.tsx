import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '@/App'

// Helper function to use waitFor with fake timers
// waitFor needs real timers to work, so we temporarily switch to real timers
async function waitForWithFakeTimers(
  callback: () => void | Promise<void>,
  options?: { timeout?: number }
) {
  vi.useRealTimers()
  try {
    await waitFor(callback, options)
  } finally {
    vi.useFakeTimers()
  }
}

// Mock timers for testing the typing animation
describe('App Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('renders all components (Header, NameInput, Greeting)', () => {
    render(<App />)

    // Check Header is rendered
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('to Vibe App')).toBeInTheDocument()

    // Check NameInput is rendered
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument()

    // Greeting should not be visible initially
    expect(screen.queryByText(/Hello/i)).not.toBeInTheDocument()
  })

  it('user can type name in input', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const input = screen.getByPlaceholderText('Enter your name')
    await user.type(input, 'Alice')

    expect(input).toHaveValue('Alice')
  })

  it('clicking "Go" button triggers greeting', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const input = screen.getByPlaceholderText('Enter your name')
    const button = screen.getByRole('button', { name: /go/i })

    await user.type(input, 'Bob')
    await user.click(button)

    // Wait for typing animation to start
    // Use real timers temporarily for waitFor to work
    await waitForWithFakeTimers(() => {
      expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('pressing Enter triggers greeting', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const input = screen.getByPlaceholderText('Enter your name')
    await user.type(input, 'Charlie{Enter}')

    // Wait for typing animation to start
    // Use real timers temporarily for waitFor to work
    await waitForWithFakeTimers(() => {
      expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('typing animation displays correctly', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const input = screen.getByPlaceholderText('Enter your name')
    const button = screen.getByRole('button', { name: /go/i })

    await user.type(input, 'David')
    await user.click(button)

    // Check that cursor appears (isTyping is true)
    // Use real timers temporarily for waitFor to work
    await waitForWithFakeTimers(() => {
      expect(screen.getByText('|')).toBeInTheDocument()
    }, { timeout: 1000 })

    // Fast-forward timers to simulate typing animation
    const fullText = 'Hello, David!'
    for (let i = 0; i < fullText.length; i++) {
      vi.advanceTimersByTime(50)
      // After advancing timers, we can check immediately since React state updates synchronously
      // But we still need to wait for the DOM to update, so use real timers briefly
      await waitForWithFakeTimers(() => {
        const text = screen.getByText(new RegExp(fullText.slice(0, i + 1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
        expect(text).toBeInTheDocument()
      }, { timeout: 100 })
    }

    // After animation completes, cursor should disappear
    vi.advanceTimersByTime(50)
    await waitForWithFakeTimers(() => {
      expect(screen.queryByText('|')).not.toBeInTheDocument()
    }, { timeout: 100 })
  })

  it('empty name does not trigger greeting', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const input = screen.getByPlaceholderText('Enter your name')
    const button = screen.getByRole('button', { name: /go/i })

    // Try to submit with empty input
    await user.click(button)

    // Greeting should not appear
    expect(screen.queryByText(/Hello/i)).not.toBeInTheDocument()
  })

  it('state flows correctly between components', async () => {
    const user = userEvent.setup({ delay: null })
    render(<App />)

    const input = screen.getByPlaceholderText('Enter your name')
    const button = screen.getByRole('button', { name: /go/i })

    // Type name and submit
    await user.type(input, 'Eve')
    await user.click(button)

    // Input should still show the name
    expect(input).toHaveValue('Eve')

    // Greeting should appear
    // Use real timers temporarily for waitFor to work
    await waitForWithFakeTimers(() => {
      expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    }, { timeout: 1000 })

    // Type a new name
    await user.clear(input)
    await user.type(input, 'Frank')
    await user.click(button)

    // New greeting should appear
    // Use real timers temporarily for waitFor to work
    await waitForWithFakeTimers(() => {
      expect(screen.getByText(/Hello, Frank!/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })
})
