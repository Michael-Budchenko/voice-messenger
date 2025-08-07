'use client';

import useConversations from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import ConversationBox from './ConversationBox';

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversations();
  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-slate-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0',
        isOpen ? 'left-0 block w-full' : 'hidden'
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div className="text-center text-2xl font-bold text-neutral-800">Messages</div>
          <div className="cursor-pointer rounded-full bg-slate-100 p-2 text-slate-600 transition hover:opacity-75">
            <FaUserPlus size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
