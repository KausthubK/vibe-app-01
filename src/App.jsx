import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleGo = () => {
    if (name.trim()) {
      setDisplayName(name)
      setTypedText('')
      setIsTyping(true)
    }
  }

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

  return (
    <div className="app">
      <div className="background-animation"></div>
      <div className="container">
        <div className="header">
          <h1 className="title">
            <span className="title-gradient">Welcome</span>
            <span className="title-subtitle">to Vibe App</span>
          </h1>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGo()}
            className="text-input"
          />
          <button onClick={handleGo} className="go-button">
            <span>Go</span>
            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
        {(displayName || typedText) && (
          <div className="display-name">
            <p className="typing-text">
              {typedText}
              {isTyping && <span className="cursor">|</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

