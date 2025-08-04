'use client';

import useConversations from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversations();

  if (isOpen) {
    return null;
  }
  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden">
      MobileFooter
    </div>
  );
};

export default MobileFooter;
