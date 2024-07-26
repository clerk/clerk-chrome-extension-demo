import { Clerk } from '@clerk/clerk-js/headless'
import { DEV_BROWSER_JWT_KEY } from '@clerk/shared'
import { parsePublishableKey } from '@clerk/shared/keys'
import browser from 'webextension-polyfill'

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const FRONTEND_API = process.env.PLASMO_PUBLIC_CLERK_FRONTEND_API

if (!PUBLISHABLE_KEY || !FRONTEND_API) {
  throw new Error('Add PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_FRONTEND_API to your environment variables')
}

const buildClerk = async (): Promise<Clerk> => {
  const key = parsePublishableKey(PUBLISHABLE_KEY)
  if (!key) throw new Error('Invalid publishable key')

  const isProd = key.instanceType === 'production';

  // Set up cookie params based on environment
  const cookieParams = isProd
    ? {
      url: FRONTEND_API,
      name: '__client',
    }
    : {
      url: FRONTEND_API,
      name: DEV_BROWSER_JWT_KEY,
    }

  // Create Clerk instance
  const clerk = new Clerk(PUBLISHABLE_KEY)
  const client = clerk.getFapiClient()

  client.onBeforeRequest(async requestInit => {
    requestInit.credentials = 'omit'
    requestInit.url?.searchParams.append('_is_native', '1')
    console.log('cookieParams', cookieParams)
    const clientJWT = await browser.cookies.get({
      url: cookieParams.url,
      name: cookieParams.name
    });
    console.log('clientJWT', clientJWT);
    (requestInit.headers as Headers).set('authorization', clientJWT?.value || '')
  })

  return clerk
}


export const getToken = async () => {

  try {
    const clerk = await buildClerk()

    console.log('clerk', clerk)

    await clerk.load({ standardBrowser: false });
    console.log('clerk loaded')
    return await clerk.session?.getToken({ skipCache: true })
  } catch (error) {
    console.log('Error getting token:', error)
    return null
  }

}


