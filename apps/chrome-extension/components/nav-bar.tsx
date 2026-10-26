import { Show, UserButton } from '@clerk/chrome-extension'
import { Link } from 'react-router'

export const NavBar = () => {
	return (
		<nav className="nav-bar">
			<Show when="signed-in">
				<Link to="/">Home</Link>
				<Link to="/sdk-features">SDK Features</Link>
				<div className="nav-bar-end">
					<Link to="/settings">Settings</Link>
					<UserButton />
				</div>
			</Show>
			<Show when="signed-out">
				<Link to="/">Home</Link>
				<div className="nav-bar-end">
					<Link to="/sign-in">Sign In</Link>
					<Link to="/sign-up">Sign Up</Link>
				</div>
			</Show>
		</nav>
	)
}
