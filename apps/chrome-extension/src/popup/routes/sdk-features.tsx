import { Button } from "~components/ui/button"

export const SDKFeatures = () => {
  return (
    <div className="plasmo-px-12 plasmo-pt-6 plasmo-pb-4">
      <h1 className="plasmo-text-2xl plasmo-mb-6">Background Service Worker Support</h1>
      <p className="plasmo-text-lg plasmo-py-2">
        The Clerk Chrome Extension SDK can use{" "}
        <button
          type="button"
          className="plasmo-underline plasmo-cursor-pointer"
          onClick={() =>
            chrome.tabs.create({
              url: "https://clerk.com/docs/reference/chrome-extension/create-clerk-client",
            })
          }
        >
          createClerkClient()
        </button>{" "}
        in a background service worker.
      </p>
      <p className="plasmo-text-lg plasmo-py-2">Open the demo tab, then select Get Token. The tab sends a message to the service worker, which returns your current session token. Keep the token private.</p>
      <Button
        variant="default"
        className="plasmo-mt-4 plasmo-text-xl"
        onClick={() => {
          chrome.tabs.create({
            url: "./tabs/background-worker-demo.html"
          })
        }}>
        Open Demo Tab
      </Button>

    </div>
  )
}
