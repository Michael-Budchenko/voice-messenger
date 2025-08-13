'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  required,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
