import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  const loginWithGoogle = () => signIn('google', { redirectTo: '/dashboard' }); 

  return (
      <Button onClick={loginWithGoogle} className='w-full bg-white text-black'>
        <FcGoogle size={30} />
        <span className='pl-3'>
          Sign in with Google
        </span>
      </Button>
  );
};

export default GoogleSignInButton;