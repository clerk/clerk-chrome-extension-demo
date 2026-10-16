import { SignInButton, Show, UserButton } from '@clerk/react';

function App() {
  return (
    <header>
      <Show when="signed-out">
        <SignInButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
}

export default App;
