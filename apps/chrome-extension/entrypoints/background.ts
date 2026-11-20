import { createClerkClient } from '@clerk/chrome-extension/client'

export default defineBackground(() => {
	const publishableKey = import.meta.env.WXT_CLERK_PUBLISHABLE_KEY
	const syncHost = import.meta.env.WXT_CLERK_SYNC_HOST

	if (!publishableKey) {
		throw new Error(
			`Add WXT_CLERK_PUBLISHABLE_KEY to your .env.${import.meta.env.MODE} file`,
		)
	}

	// Use `createClerkClient()` with `background: true` to create a new Clerk instance
	// optimized for background service workers, and use `getToken()` to get a fresh token for the user
	async function getToken() {
		const clerk = await createClerkClient({
			publishableKey,
			// Read the session from the sync host's cookie, not only the token the popup stored
			syncHost,
			background: true,
		})

		// If there is no valid session, then return null. Otherwise proceed.
		if (!clerk.session) {
			return null
		}

		// Return the user's session
		return await clerk.session.getToken()
	}

	// Create a listener to listen for messages from other parts of the extension, such as the demo page
	// It must return true, in order to keep the connection open and send a response later.
	// NOTE: A runtime listener cannot be async.
	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		// Only answer the message the demo page sends
		if (request?.greeting !== 'get-token') return

		// This example sends the token back to the extension page
		// but you could also use the token to perform actions on behalf of the user
		getToken()
			.then((token) => sendResponse({ token }))
			.catch((error) => {
				console.error('[Background service worker] Error:', error)
				// If there is no token then send a null response
				sendResponse({ token: null })
			})
		return true // REQUIRED: Indicates that the listener responds asynchronously.
	})
})
