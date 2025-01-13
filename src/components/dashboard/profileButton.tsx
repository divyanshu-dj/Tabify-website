//(Server Component)
import { getServerSession } from 'next-auth';
import authOptions from '../../app/api/auth/[...nextauth]/options';
import { ProfileButtonClient } from '../ui/profileButtonClient';

const ProfileButton = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  return <ProfileButtonClient session={session} />;
};

export default ProfileButton;


