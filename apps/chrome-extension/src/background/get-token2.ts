// mock window and document to load clerk successfully
import { Clerk } from '@clerk/clerk-js/headless'
// const virtDom = new JSDOM();
// global.window = (virtDom.window as unknown) as Window & typeof globalThis;
// global.document = virtDom.window.document;

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment variables')
}

let clerk: Clerk;

async function initClerk() {
  clerk = new Clerk(process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY);

  try {
    await clerk.load({
      standardBrowser: false,

    });
  } catch (err) {
    console.error(err)
  }

}

initClerk().then(() => {
  console.debug("[background] clerk loaded");
  clerk.addListener(({ user }) => {
    if (!user) {
      console.debug("[background] user logged out");
      //logout();
      return;
    }
  });
});


export async function getAuthToken(): Promise<string> {
  console.debug("[background] getting auth token from clerk");
  if (!clerk.loaded) {
    console.debug("[background] clerk is not ready, initializing clerk");
    await initClerk();
  }

  if (!clerk.session) {
    console.debug("[background] cannot get clerk session")
    return null;
  }

  return await clerk.session.getToken();
}

