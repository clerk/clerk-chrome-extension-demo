/** @type {import("prettier").Options} */
module.exports = {
	tabWidth: 2, // A11y reason to use tabs
	useTabs: true, // A11y reason to use tabs
	semi: false,
	singleQuote: true,
	plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-packagejson'],
	tailwindConfig: './apps/chrome-extension/tailwind.config.js', // Find a better way to do this
	endOfLine: 'auto',
}
