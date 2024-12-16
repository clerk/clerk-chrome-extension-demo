<p align="center">
  <a href="https://clerk.com?utm_source=github&utm_medium=owned" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./assets/light-logo.png">
      <img alt="Clerk Logo for light background" src="./assets/dark-logo.png" height="64">
    </picture>
  </a>
  <br />
</p>
<div align="center">
  <h1>
    Clerk and Chrome Extension Demo
  </h1>  
  <a href="https://www.npmjs.com/package/@clerk/clerk-js">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/@clerk/clerk-js" />
  </a>
  <a href="https://discord.com/invite/b5rXHjAg7A">
    <img alt="Discord" src="https://img.shields.io/discord/856971667393609759?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <a href="https://twitter.com/clerkdev">
    <img alt="Twitter" src="https://img.shields.io/twitter/url.svg?label=%40clerkdev&style=social&url=https%3A%2F%2Ftwitter.com%2Fclerkdev" />
  </a> 
  <br />
  <br />
  <img alt="Clerk Hero Image" src="./assets/hero.png">
</div>

## Introduction

Clerk is a developer-first authentication and user management solution. It provides pre-built React components and hooks for sign-in, sign-up, user profile, and organization management. Clerk is designed to be easy to use and customize, and can be dropped into any Chrome Extension application.

This repo includes a demo of the Chrome Extension SDK and its core features. Included in this demo app are:
* Using [React Router](https://clerk.com/docs/references/chrome-extension/add-react-router) for route/page management in the extension
* [Sync Host](https://clerk.com/docs/references/chrome-extension/sync-host-configuration) to allow for syncing auth state from a web application to the extension
* The [`createClerkClient()`](https://clerk.com/docs/references/chrome-extension/create-clerk-client) helper for background service workers




## Running the demo

```bash
git clone https://github.com/clerkinc/clerk-chrome-extension-demo
```

To run the example locally, you need to:

1. Sign up for a Clerk account at [https://clerk.com](https://dashboard.clerk.com/sign-up?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo).

2. Go to the [Clerk dashboard](https://dashboard.clerk.com?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo) and create an application.

3. Copy the [`.env.development.example` file](./apps/chrome-extension/.env.development.example) to `/apps/chrome-extension/.env.development` and add the required environment variables.
* `PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY` - the Clerk Publishable Key from the [API keys](https://dashboard.clerk.com/last-active?path=api-keys) Dashboard page.
* `CLERK_FRONTEND_API` - the Clerk Frontend API URL from the `Show API URLs` button on the [API keys](https://dashboard.clerk.com/last-active?path=api-keys) dashboard page.
* `PLASMO_PUBLIC_CLERK_SYNC_HOST` - this is only required if you want to test the Sync Host feature. This is configured to match the web app included in this repo.

4. Copy the [`.env.chrome.example` file](./apps/chrome-extension/.env.chrome.example) to `/apps/chrome-extension/.env.chrome` and add the following required environment variables.
* `CRX_PUBLIC_KEY` - the public key for your Chrome Extension. The [Chrome Extension Quickstart](https://clerk.com/docs/quickstarts/chrome-extension) and the [Configure a Consistent CRX ID](https://clerk.com/docs/references/chrome-extension/configure-consistent-crx-id) cover creating this.

5. Copy the [`.env.example` file](./apps/web-app/.env.example) to `/apps/web-app/.env` and add the required environment variables.
* `VITE_CLERK_PUBLISHABLE_KEY` - the Clerk Publishable Key from the [API keys](https://dashboard.clerk.com/last-active?path=api-keys) Dashboard page.


6. `pnpm install` the required dependencies for both applications.

7. `pnpm dev` to launch the web application and launch the dev server for the extension and create it initial build.

8. Install the extension in Chrome by loading it as an [unpacked extension](https://clerk.com/docs/quickstarts/chrome-extension#load-your-chrome-extension-into-your-chromium-based-browser).

## Learn more

To learn more about Clerk and Chrome Extensions, check out the following resources:

- [Quickstart: Get started with Chrome Extensions and Clerk](https://clerk.com/docs/quickstarts/chrome-extension?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo)

- [Clerk Documentation](https://clerk.com/docs?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo)
- [Chrome Extensions](https://developer.chrome.com/docs/extensions)


## SDK Features

1. To see the usage of React Router, open the popup and navigate between the page using the buttons at the bottom.

2. For Sync Host, make sure you are signed out of the extension and the web applications. Once fully signed out, sign into the web application in any manner you wish, including OAuth. Once done, open the popup and you will see you are signed in correctly. **WARNING:** You must be using the same Clerk instance and the same Publishable key in both. If you are using a different Publishable key then this feature will not work.

3. To test the `createClerkClient()` function, sign into the extension. Once signed in there is a `SDK Features` button in the bottom menu. Navigate to that page and then click the `Open Demo Tab` button. This will open a new tab in your browser. In that tab click the `Get Token` button. The box for the token will be populated with your current session token.


## Found an issue or want to leave feedback

Feel free to create a support thread on our [Discord](https://clerk.com/discord). Our support team will be happy to assist you in the `#support` channel.

## Connect with us

You can discuss ideas, ask questions, and meet others from the community in our [Discord](https://discord.com/invite/b5rXHjAg7A).

If you prefer, you can also find support through our [Twitter](https://twitter.com/ClerkDev), or you can [email](mailto:support@clerk.dev) us!
