import { ClerkProvider } from '@clerk/chrome-extension'
import { Outlet, useNavigate } from 'react-router'

import { NavBar } from '@/components/nav-bar'

const PUBLISHABLE_KEY = import.meta.env.WXT_CLERK_PUBLISHABLE_KEY
const SYNC_HOST = import.meta.env.WXT_CLERK_SYNC_HOST

if (!PUBLISHABLE_KEY || !SYNC_HOST) {
	throw new Error(
		`Add WXT_CLERK_PUBLISHABLE_KEY and WXT_CLERK_SYNC_HOST to your .env.${import.meta.env.MODE} file`,
	)
}

export const RootLayout = () => {
	const navigate = useNavigate()

	return (
		<ClerkProvider
			routerPush={(to) => navigate(to)}
			routerReplace={(to) => navigate(to, { replace: true })}
			publishableKey={PUBLISHABLE_KEY}
			afterSignOutUrl="/"
			signInUrl="/sign-in"
			signUpUrl="/sign-up"
			syncHost={SYNC_HOST}
		>
			<div className="layout">
				<main>
					<Outlet />
				</main>
				<footer>
					<NavBar />
				</footer>
			</div>
		</ClerkProvider>
	)
}
