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
  <a href="https://www.npmjs.com/package/@clerk/chrome-extension">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/@clerk/chrome-extension" />
  </a>
  <a href="https://clerk.com/discord">
    <img alt="Discord" src="https://img.shields.io/discord/856971667393609759?color=7389D8&label&logo=discord&logoColor=ffffff" />
  </a>
  <a href="https://x.com/clerk">
    <img alt="Follow on X" src="https://img.shields.io/twitter/url.svg?label=%40clerk&style=social&url=https%3A%2F%2Fx.com%2Fclerk" />
  </a> 
  <br />
  <br />
  <img alt="Clerk Hero Image" src="./assets/hero.png">
</div>

## Introduction

Clerk is a developer-first authentication and user management solution. It provides pre-built React components and hooks for sign-in, sign-up, user profile, and organization management. Clerk is designed to be easy to use and customize, and can be dropped into any Chrome Extension application.

This repo includes a demo of the Chrome Extension SDK and its core features. Included in this demo app are:
* Using [React Router](https://clerk.com/docs/guides/development/add-react-router) for route/page management in the extension
* [Sync Host](https://clerk.com/docs/guides/sessions/sync-host) to allow for syncing auth state from a web application to the extension
* The [`createClerkClient()`](https://clerk.com/docs/reference/chrome-extension/create-clerk-client) helper for background service workers




## Running the demo

```bash
git clone https://github.com/clerk/clerk-chrome-extension-demo.git
```

To run the example locally, you need to:

1. Sign up for a Clerk account in the [Clerk Dashboard](https://dashboard.clerk.com/sign-up?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo).

2. Create a development application in the [Clerk Dashboard](https://dashboard.clerk.com?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo) and [enable the Native API](https://clerk.com/docs/chrome-extension/getting-started/quickstart#enable-native-api).

3. Copy the [`.env.development.example` file](./apps/chrome-extension/.env.development.example) to `/apps/chrome-extension/.env.development` and add the required environment variables.
* `WXT_CLERK_PUBLISHABLE_KEY` - the Clerk Publishable Key from the [API keys](https://dashboard.clerk.com/last-active?path=api-keys) Dashboard page.
* `WXT_CLERK_FRONTEND_API` - the Clerk Frontend API URL from the `Show API URLs` button on the [API keys](https://dashboard.clerk.com/last-active?path=api-keys) dashboard page.
* `WXT_CLERK_SYNC_HOST` - set this to `http://localhost` for local development. The popup requires this value, and it lets the extension sync with the companion web app.

4. Copy the [`.env.chrome.example` file](./apps/chrome-extension/.env.chrome.example) to `/apps/chrome-extension/.env.chrome` and add the following required environment variables.
* `WXT_CRX_PUBLIC_KEY` - the extension's public key, not its ID. [Generate a consistent CRX ID and public key](https://clerk.com/docs/guides/development/configure-consistent-crx-id), and keep the private key out of version control.

5. Copy the [`.env.example` file](./apps/web-app/.env.example) to `/apps/web-app/.env` and add the required environment variables.
* `VITE_CLERK_PUBLISHABLE_KEY` - use the same Clerk development instance and Publishable Key as the extension.

6. Run `pnpm install` from the repository root to install dependencies for both applications.

7. Run `pnpm dev` from the repository root. The web app starts at `http://localhost:5173`, and [WXT](https://wxt.dev) builds the extension at `apps/chrome-extension/.output/chrome-mv3-dev` and opens Chrome with it installed.

8. In the Chrome window WXT opened, go to `chrome://extensions` and confirm that Chrome shows the CRX ID you generated. To use your own Chrome profile instead, enable Developer mode and [load the extension as unpacked](https://clerk.com/docs/chrome-extension/getting-started/quickstart#start-the-development-server) from `apps/chrome-extension/.output/chrome-mv3-dev`.

9. [Add `chrome-extension://<your CRX ID>` to the Clerk instance's allowed origins](https://clerk.com/docs/guides/sessions/sync-host#add-the-extensions-id-to-your-web-apps-allowed_origins) so the extension can sync sessions with the web app. Use the ID shown at `chrome://extensions`, not the public key.

10. Open the web app at [http://localhost:5173](http://localhost:5173) in the same Chrome window that runs the extension, then open the extension and sign in. The extension uses the web app's Clerk cookies, so the web app must load at least once first.

### Troubleshooting

If signing in to the extension fails with "Unable to authenticate this browser for your development instance":

1. Open [http://localhost:5173](http://localhost:5173) in the same Chrome window, then reopen the extension and try again.
2. If the error persists, another Clerk app on `localhost` may have overwritten the cookie, because cookies are shared across all `localhost` ports. On `http://localhost:5173`, open DevTools → **Application** → **Cookies** → `http://localhost`, delete every cookie whose name starts with `__clerk` or `__client`, reload the page, then reopen the extension.

## Learn more

To learn more about Clerk and Chrome Extensions, check out the following resources:

- [Quickstart: Get started with Chrome Extensions and Clerk](https://clerk.com/docs/chrome-extension/getting-started/quickstart?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo)

- [Clerk Documentation](https://clerk.com/docs?utm_source=readme&utm_medium=owned&utm_campaign=chrome-extension&utm_content=10-24-2023&utm_term=clerk-chrome-extension-demo)
- [Chrome Extensions](https://developer.chrome.com/docs/extensions)


## SDK Features

1. To see the usage of React Router, open the popup and navigate between the page using the buttons at the bottom.

2. For Sync Host, make sure you are signed out of the extension and the web applications. Once fully signed out, sign into the web application in any manner you wish, including OAuth. Once done, open the popup and you will see you are signed in correctly. **WARNING:** You must be using the same Clerk instance and the same Publishable key in both. If you are using a different Publishable key then this feature will not work.

3. To test the `createClerkClient()` function, sign into the extension. Once signed in there is a `SDK Features` button in the bottom menu. Navigate to that page and then click the `Open Demo Tab` button. This will open a new tab in your browser. In that tab click the `Get Token` button. The box for the token will be populated with your current session token.


## Found an issue or want to leave feedback

[Contact](https://clerk.com/contact/support) or email [support@clerk.com](mailto:support@clerk.com) us for support.

## Connect with us

You can discuss ideas and meet others from the community in our [Discord](https://clerk.com/discord).

You can also follow [@clerk on X](https://x.com/clerk) for updates.
