import { useState, useEffect } from 'react'
import './App.css'
// Import our smaller components
import Header from './components/Header'
import NameInput from './components/NameInput'
import Greeting from './components/Greeting'

// App Component: The main component that coordinates everything
// This is the "container" component - it manages state and passes data to child components
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
  // Notice how we're using our custom components like HTML tags!
  return (
    <div className="app">
      {/* Background decoration: Animated visual element behind the content */}
      <div className="background-animation"></div>
      
      {/* Main container: Wraps all the visible content */}
      <div className="container">
        {/* Using the Header component - no props needed since it's just static content */}
        <Header />
        
        {/* Using the NameInput component - passing data and functions as "props" */}
        {/* Props are like function arguments, but for components */}
        <NameInput 
          name={name}                    // Pass the current name value
          onNameChange={setName}         // Pass the function to update name
          onGo={handleGo}                // Pass the function to handle "Go" click
        />
        
        {/* Using the Greeting component - passing the typing animation data */}
        <Greeting 
          typedText={typedText}          // Pass the text being typed
          isTyping={isTyping}            // Pass whether typing is active
        />
      </div>
    </div>
  )
}

export default App
