import { SignUp } from '@clerk/chrome-extension'

export const SignUpPage = () => {
	return (
		<div className="centered">
			<SignUp
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
