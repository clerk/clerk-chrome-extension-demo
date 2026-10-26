import { createClerkClient } from '@clerk/chrome-extension/client'

export default defineBackground(() => {
	const publishableKey = import.meta.env.WXT_CLERK_PUBLISHABLE_KEY
	const syncHost = import.meta.env.WXT_CLERK_SYNC_HOST

	if (!publishableKey) {
		throw new Error(
			'Please add the WXT_CLERK_PUBLISHABLE_KEY to the .env.development file',
		)
	}

	// Use `createClerkClient()` with `background: true` to create a new Clerk instance
	// optimized for background service workers, and use `getToken()` to get a fresh token for the user
	async function getToken() {
		const clerk = await createClerkClient({
			publishableKey,
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

	// Create a listener to listen for messages from content scripts
	// It must return true, in order to keep the connection open and send a response later.
	// NOTE: A runtime listener cannot be async.
	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		// This example sends the token back to the content script
		// but you could also use the token to perform actions on behalf of the user
		getToken()
			.then((token) => sendResponse({ token }))
			.catch((error) => {
				console.error(
					'[Background service worker] Error:',
					JSON.stringify(error),
				)
				// If there is no token then send a null response
				sendResponse({ token: null })
			})
		return true // REQUIRED: Indicates that the listener responds asynchronously.
	})
})
