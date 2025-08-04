'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
  onClick?: () => void;
}
const DesktopItem: React.FC<DesktopItemProps> = ({ label, icon: Icon, href, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6',
          active ? 'bg-slate-600 text-white' : 'text-zinc-500 hover:bg-slate-300 hover:text-black'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
