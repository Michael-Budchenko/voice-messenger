'use client';

import Avatar from '@/app/components/Avatar';
import { Conversation, User } from '@/app/generated/prisma';
import useOtherUser from '@/app/hooks/useOtherUser';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FaChevronLeft, FaEllipsis } from 'react-icons/fa6';
import ProfileDrawer from './ProfileDrawer';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return 'Active';
  }, [conversation]);
  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/conversations"
            className="trasition block cursor-pointer text-indigo-500 hover:text-indigo-600 hover:opacity-75 lg:hidden"
          >
            <FaChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div>
            {conversation.name || otherUser.name}
            <div className="text-xs font-light text-neutral-500">{statusText}</div>
          </div>
        </div>
        <FaEllipsis
          size={32}
          className="cursor-pointer text-indigo-600 transition hover:text-indigo-600"
          onClick={() => {}}
        />
      </div>
    </>
  );
};

export default Header;
