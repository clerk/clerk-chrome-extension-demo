import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/chrome-extension";
import { NavBar } from "~components/nav-bar";

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
const SYNC_HOST = process.env.PLASMO_PUBLIC_SYNC_HOST

if (!PUBLISHABLE_KEY || !SYNC_HOST) {
  throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY and PLASMO_PUBLIC_SYNC_HOST to the .env.development file')
}

export const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);
  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      syncHost={SYNC_HOST}
    >
      <div className="plasmo-h-svh plasmo-flex plasmo-flex-col">
        <header className="plasmo-border-2 plasmo-border-green-500">
          <NavBar />
        </header>
        <main className="plasmo-grow plasmo-border-2 plasmo-border-red-500">
          <Outlet />
        </main>

      </div>
    </ClerkProvider>
  );
};
