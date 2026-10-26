import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import '@/assets/main.css'
import './style.css'

function BackgroundWorkerDemo() {
	const [token, setToken] = useState<string | null>(null)

	const getToken = async () => {
		// Trigger the background service worker to get the token
		const response = await browser.runtime.sendMessage({
			greeting: 'get-token',
		})
		setToken(response.token)
	}

	return (
		<div className="demo">
			<div className="demo-content">
				<h1>Clerk Background Service Worker demo</h1>
				<p>
					This new tab simulates a content page where you might want to access
					user information, or make a request to your backend server and include
					a user token in the request.
				</p>
				<p>
					Make sure that you are signed into the extension. You can have the
					popup closed.
				</p>
				<button type="button" className="button" onClick={getToken}>
					Get Token
				</button>
				<p>Token:</p>
				<div className="token">{token && <p>{token}</p>}</div>
			</div>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BackgroundWorkerDemo />
	</React.StrictMode>,
)
