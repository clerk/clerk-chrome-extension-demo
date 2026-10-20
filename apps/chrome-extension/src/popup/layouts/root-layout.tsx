import type { ComponentProps, ComponentType } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/chrome-extension'
import { NavBar } from '~components/nav-bar'

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const SYNC_HOST = process.env.PLASMO_PUBLIC_CLERK_SYNC_HOST
const POPUP_URL = chrome.runtime.getURL('popup.html')

if (!PUBLISHABLE_KEY || !SYNC_HOST) {
	throw new Error(
		'Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY and PLASMO_PUBLIC_CLERK_SYNC_HOST to the .env.development file',
	)
}

// The Chrome SDK's provider type omits these documented navigation props.
const RoutedClerkProvider = ClerkProvider as ComponentType<
	ComponentProps<typeof ClerkProvider> & {
		routerPush: (to: string) => void | Promise<void>
		routerReplace: (to: string) => void | Promise<void>
		afterSignOutUrl: string
		signInFallbackRedirectUrl: string
		signUpFallbackRedirectUrl: string
	}
>

export const RootLayout = () => {
	const navigate = useNavigate()

	return (
		<RoutedClerkProvider
			routerPush={(to) => navigate(to)}
			routerReplace={(to) => navigate(to, { replace: true })}
			publishableKey={PUBLISHABLE_KEY}
			afterSignOutUrl="/"
			signInFallbackRedirectUrl={POPUP_URL}
			signUpFallbackRedirectUrl={POPUP_URL}
			syncHost={SYNC_HOST}
		>
			<div className="plasmo-w-[785px] plasmo-h-[600px] plasmo-flex plasmo-flex-col plasmo-bg-black plasmo-text-white">
				<main className="plasmo-grow plasmo-h-[543px]">
					<Outlet />
				</main>
				<footer className="plasmo-fixed plasmo-bottom-0 plasmo-w-full">
					<NavBar />
				</footer>
			</div>
		</RoutedClerkProvider>
	)
}
