import { SignIn } from '@clerk/chrome-extension'

export const SignInPage = () => {
	return (
		<div className="centered">
			<SignIn
				appearance={{
					elements: {
						socialButtonsRoot: { display: 'none' },
						dividerRow: { display: 'none' },
					},
				}}
			/>
		</div>
	)
}
