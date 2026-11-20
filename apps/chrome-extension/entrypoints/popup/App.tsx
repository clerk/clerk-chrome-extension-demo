import { createMemoryRouter, RouterProvider } from 'react-router'

import { RootLayout } from './layouts/root-layout'
import { Home } from './routes/home'
import { SDKFeatures } from './routes/sdk-features'
import { Settings } from './routes/settings'
import { SignInPage } from './routes/sign-in'
import { SignUpPage } from './routes/sign-up'

const router = createMemoryRouter([
	{
		// Wraps the entire app in the root layout
		element: <RootLayout />,
		// Mounted where the <Outlet /> component is inside the root layout
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/sign-in', element: <SignInPage /> },
			{ path: '/sign-up', element: <SignUpPage /> },
			{ path: '/settings', element: <Settings /> },
			{ path: '/sdk-features', element: <SDKFeatures /> },
		],
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
