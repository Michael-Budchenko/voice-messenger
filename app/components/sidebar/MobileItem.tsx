import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        'group flex w-full justify-center gap-x-3 rounded-md p-4 text-sm font-semibold leading-6 text-white',
        active ? 'bg-slate-600' : 'text-zinc-500 hover:bg-slate-300 hover:text-black'
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
