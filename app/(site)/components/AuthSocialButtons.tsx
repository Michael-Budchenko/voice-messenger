import { IconType } from 'react-icons';

interface AuthSocialButtonsProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButtons: React.FC<AuthSocialButtonsProps> = ({ icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-zinc-500 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
    >
      {<Icon />}
    </button>
  );
};

export default AuthSocialButtons;
