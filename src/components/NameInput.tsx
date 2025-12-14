import { ChangeEvent, KeyboardEvent } from 'react'

// NameInput Component: Handles the input field and submit button
// Props: Data passed from parent component to child component
// - name: The current value in the input field
// - onNameChange: Function to update the name when user types
// - onGo: Function to trigger when user clicks "Go" or presses Enter
interface NameInputProps {
  name: string
  onNameChange: (value: string) => void
  onGo: () => void
}

function NameInput({ name, onNameChange, onGo }: NameInputProps) {
  return (
    <div className="input-group">
      {/* Text input: The field where users enter their name */}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onNameChange(e.target.value)}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onGo()}
        className="text-input"
      />
      {/* Submit button: Triggers the greeting when clicked */}
      <button onClick={onGo} className="go-button">
        <span>Go</span>
        <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  )
}

export default NameInput
