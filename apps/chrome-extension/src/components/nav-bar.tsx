import { SignedIn, SignedOut, UserButton } from "@clerk/chrome-extension"
import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <>
      <SignedIn>
        <div className="plasmo-flex plasmo-flex-row plasmo-w-full plasmo-items-center">
          <Link to="/">Home</Link>
          <Link to="/sdk-features">SDK Features</Link>
          <div className="plasmo-grow plasmo-items-center plasmo-justify-end plasmo-flex">
            <Link to="/settings">Settings</Link>
            <UserButton />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <Link to="/">Home</Link>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </SignedOut>

    </>
  )
}
