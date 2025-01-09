'use client';

import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

interface LeftSidebarClientProps {
  session: { user?: { name?: string | null, email?: string | null, image?: string | null } } | null;
}

const LeftSidebarClient: React.FC<LeftSidebarClientProps> = ({ session }) => {
  const signOutOfAccount = () => signOut({ callbackUrl: '/' });

  return (
    <div className="h-screen bg-slate-600">
      <h1>{session?.user?.name || 'Guest'}</h1>
      <Button onClick={signOutOfAccount} className="w-full">
        Sign Out
      </Button>
    </div>
  );
};

export default LeftSidebarClient;
