import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import './App.css'

function App() {
  // State management: These variables store the app's data and can trigger re-renders when changed
  const [name, setName] = useState<string>('') // Stores what the user types in the input field
  const [displayName, setDisplayName] = useState<string>('') // Stores the name to be displayed after clicking "Go"
  const [typedText, setTypedText] = useState<string>('') // Stores the text currently being "typed out" character by character
  const [isTyping, setIsTyping] = useState<boolean>(false) // Tracks whether the typing animation is currently running

  // Event handler: This function runs when the user clicks "Go" or presses Enter
  const handleGo = () => {
    if (name.trim()) {
      setDisplayName(name)
      setTypedText('')
      setIsTyping(true)
    }
  }

  // Side effect: This runs automatically when isTyping or displayName changes
  // It creates the typing animation by adding one character at a time
  useEffect(() => {
    if (isTyping && displayName) {
      const fullText = `Hello, ${displayName}!`
      let currentIndex = 0
      setTypedText('')

      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 50) // Typing speed: 50ms per character

      return () => clearInterval(typingInterval)
    }
  }, [isTyping, displayName])

  // JSX return: This is what gets rendered on the screen
  return (
    <div className="app">
      {/* Background decoration: Animated visual element behind the content */}
      <div className="background-animation"></div>
      
      {/* Main container: Wraps all the visible content */}
      <div className="container">
        {/* Header section: Contains the title and welcome message */}
        <div className="header">
          <h1 className="title">
            <span className="title-gradient">Welcome</span>
            <span className="title-subtitle">to Vibe App</span>
          </h1>
        </div>
        
        {/* Input section: Where users type their name and submit it */}
        <div className="input-group">
          {/* Text input: The field where users enter their name */}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleGo()}
            className="text-input"
          />
          {/* Submit button: Triggers the greeting when clicked */}
          <button onClick={handleGo} className="go-button">
            <span>Go</span>
            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
        
        {/* Display section: Shows the greeting message with typing animation (only appears after user submits) */}
        {(displayName || typedText) && (
          <div className="display-name">
            <p className="typing-text">
              {typedText}
              {/* Cursor indicator: Shows a blinking cursor while typing animation is active */}
              {isTyping && <span className="cursor">|</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
