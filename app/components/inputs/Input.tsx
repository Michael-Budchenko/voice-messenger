'use client';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const Input: React.FC<InputProps> = ({ label, id, type = 'text', register, errors, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-900" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required: true })}
          className={clsx(
            `form-input block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'cursor-default opacity-50'
          )}
        />
      </div>
    </div>
  );
};

export default Input;
