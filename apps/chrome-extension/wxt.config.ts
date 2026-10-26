import { defineConfig } from 'wxt'

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
	modules: ['@wxt-dev/module-react'],
	manifest: () => ({
		name: 'Clerk Chrome Extension Demo',
		description:
			'A feature rich implementation of Clerk with a WXT-based Chrome Extension.',
		key: import.meta.env.WXT_CRX_PUBLIC_KEY,
		permissions: ['cookies', 'storage'],
		host_permissions: [
			`${import.meta.env.WXT_CLERK_SYNC_HOST}/*`,
			`${import.meta.env.WXT_CLERK_FRONTEND_API}/*`,
		],
	}),
})
