// LeftSidebar.tsx (Server Component)
import { getServerSession } from 'next-auth';
import authOptions from '../../app/api/auth/[...nextauth]/options';
import LeftSidebarClient from './leftSidebarClient';

const LeftSidebar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <LeftSidebarClient session={session} />;
};

export default LeftSidebar;
