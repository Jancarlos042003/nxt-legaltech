interface LoginFormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

export function LoginFormInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
}: LoginFormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#3a1259] mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c96de] focus:border-transparent transition-all placeholder-gray-400"
          placeholder={placeholder}
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
}
