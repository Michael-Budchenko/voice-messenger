'use client';

import ReactSelect from 'react-select';

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}
const Select = ({ label, value, options, onChange, disabled }: SelectProps) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium text-zinc-900">{label}</label>
      <div className="mt-2">
        <ReactSelect
          value={value}
          isDisabled={disabled}
          isMulti
          options={options}
          onChange={onChange}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => 'text-zinc-900 border-zinc-300 focus:border-black',
            input: () => 'text-zinc-900',
            option: () => 'text-zinc-900',
          }}
        />
      </div>
    </div>
  );
};

export default Select;
