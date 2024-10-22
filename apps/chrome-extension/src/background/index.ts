import { createClerkClient } from '@clerk/chrome-extension/background';

console.log('[Service Worker]: Loaded')

const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
if (!publishableKey) {
  throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
}

async function getToken() {
  const clerk = await createClerkClient({
    publishableKey,
    syncHost: process.env.PLASMO_PUBLIC_SYNC_HOST
  });
  return await clerk.session?.getToken();
}

// create a listener to listen for messages from content scripts
// NOTE: A runtime listener cannot be async.
//       It must return true, in order to keep the connection open and send a response later.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // if (request.greeting === "get-token") {
  console.log('[Service Worker]: Handling request for the user\'s current token')
  getToken()
    .then((token) => {
      console.log('[Service Worker]: Sending token in response')
      sendResponse({ token })
    })
    .catch((error) => {
      console.error('[Service Worker]: Error occured -> ', JSON.stringify(error))
    });
  // }
  return true;
});


