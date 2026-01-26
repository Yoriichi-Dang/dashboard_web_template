'use client';

import { Icons } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui/button';

export default function GithubSignInButton() {
  const handleGithubSignIn = () => {
    // Clerk will handle the GitHub OAuth flow
    // This button is typically used within Clerk's <SignIn /> component
    // For standalone use, you would use Clerk's signIn.authenticateWithRedirect
  };

  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={handleGithubSignIn}
    >
      <Icons.github className='mr-2 h-4 w-4' />
      Continue with Github
    </Button>
  );
}
