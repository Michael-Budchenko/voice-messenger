import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { GoComment, GoPeople, GoSignIn } from 'react-icons/go';
import useConversation from './useConversation';

const useRoutes = () => {
  const pathName = usePathname();
  const conversationId = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: GoComment,
        active: pathName === '/conversations' || pathName?.startsWith('/conversations/'),
      },

      {
        label: 'Users',
        href: '/users',
        icon: GoPeople,
        active: pathName === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        icon: GoSignIn,
        onClick: () => signOut(),
      },
    ],
    [pathName, conversationId]
  );
  return routes;
};

export default useRoutes;
