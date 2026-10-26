export const SDKFeatures = () => {
	return (
		<div className="page">
			<h1>Background Service Worker Support</h1>
			<p>
				The Clerk Chrome Extension SDK can use{' '}
				<button
					type="button"
					className="link-button"
					onClick={() =>
						browser.tabs.create({
							url: 'https://clerk.com/docs/reference/chrome-extension/create-clerk-client',
						})
					}
				>
					createClerkClient()
				</button>{' '}
				in a background service worker.
			</p>
			<p>
				Open the demo tab, then select Get Token. The tab sends a message to the
				service worker, which returns your current session token. Keep the token
				private.
			</p>
			<button
				type="button"
				className="button"
				onClick={() => {
					browser.tabs.create({
						url: browser.runtime.getURL('/background-worker-demo.html'),
					})
				}}
			>
				Open Demo Tab
			</button>
		</div>
	)
}
