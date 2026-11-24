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
				<h1>Clerk background service worker demo</h1>
				<p>
					This extension page asks the background service worker for the user's
					session token, which you'd include in requests to your backend.
				</p>
				<p>
					Ensure you're signed in to the extension. The popup can stay closed.
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
