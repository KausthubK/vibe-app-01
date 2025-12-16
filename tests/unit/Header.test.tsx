import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header', () => {
  it('renders the title text correctly', () => {
    render(<Header />)
    
    // Check that "Welcome" text is present
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    
    // Check that "to Vibe App" text is present
    expect(screen.getByText('to Vibe App')).toBeInTheDocument()
  })

  it('contains the header structure', () => {
    render(<Header />)
    
    // Check that the header div is present
    const header = screen.getByRole('heading', { level: 1 })
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('title')
  })
})
