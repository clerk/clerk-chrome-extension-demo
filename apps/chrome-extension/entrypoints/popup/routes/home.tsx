import logo from '@/assets/light-logo.png'

export const Home = () => {
	return (
		<div className="centered">
			<img src={logo} alt="Clerk Chrome Extension Demo" />
			<h1>Clerk Chrome Extension Demo</h1>
			<p className="page">
				Sign in with the popup or sync your auth state with{' '}
				<a href="http://localhost:5173" target="_blank">
					http://localhost:5173
				</a>
				. Explore an extension built with React Router and get a token from the
				background service worker using{' '}
				<a
					href="https://clerk.com/docs/reference/chrome-extension/create-clerk-client"
					target="_blank"
				>
					createClerkClient()
				</a>
				.
			</p>
		</div>
	)
}
