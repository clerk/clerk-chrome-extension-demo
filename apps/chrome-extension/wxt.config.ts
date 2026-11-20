import { defineConfig } from 'wxt'

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
	modules: ['@wxt-dev/module-react'],
	hooks: {
		// Stop the build if the Clerk values are missing. `wxt build` and `wxt zip`
		// read `.env.production`, not `.env.development`
		'build:before': (wxt) => {
			if (
				!import.meta.env.WXT_CLERK_PUBLISHABLE_KEY ||
				!import.meta.env.WXT_CLERK_FRONTEND_API ||
				!import.meta.env.WXT_CLERK_SYNC_HOST
			) {
				throw new Error(
					`Add WXT_CLERK_PUBLISHABLE_KEY, WXT_CLERK_FRONTEND_API, and WXT_CLERK_SYNC_HOST to your .env.${wxt.config.mode} file`,
				)
			}
		},
	},
	manifest: () => ({
		name: 'Clerk Chrome Extension Demo',
		description:
			'Clerk sign-in, sync host, and background service worker tokens in a WXT Chrome Extension.',
		key: import.meta.env.WXT_CRX_PUBLIC_KEY,
		permissions: ['cookies', 'storage'],
		host_permissions: [
			`${import.meta.env.WXT_CLERK_SYNC_HOST}/*`,
			`${import.meta.env.WXT_CLERK_FRONTEND_API}/*`,
		],
	}),
})
