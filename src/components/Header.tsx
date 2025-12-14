// Header Component: A reusable component that displays the app title
// This component doesn't need any data from the parent, so it takes no props
// It's a "presentational" component - just displays static content
function Header() {
  return (
    <div className="header">
      <h1 className="title">
        <span className="title-gradient">Welcome</span>
        <span className="title-subtitle">to Vibe App</span>
      </h1>
    </div>
  )
}

export default Header
