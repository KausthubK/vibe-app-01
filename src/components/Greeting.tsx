// Greeting Component: Displays the typing animation greeting
// Props: Data passed from parent component
// - typedText: The text currently being displayed character by character
// - isTyping: Whether the typing animation is currently running
interface GreetingProps {
  typedText: string
  isTyping: boolean
}

function Greeting({ typedText, isTyping }: GreetingProps) {
  // Only show this component if there's text to display
  if (!typedText && !isTyping) {
    return null // Don't render anything if there's nothing to show
  }

  return (
    <div className="display-name">
      <p className="typing-text">
        {typedText}
        {/* Cursor indicator: Shows a blinking cursor while typing animation is active */}
        {isTyping && <span className="cursor">|</span>}
      </p>
    </div>
  )
}

export default Greeting
