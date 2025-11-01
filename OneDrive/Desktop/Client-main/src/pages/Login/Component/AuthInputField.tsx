interface AuthInputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInputField({
  label,
  type = 'text',
  value,
  onChange,
}: AuthInputFieldProps) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2.5">
      <label className="font-[Pretendard_Variable] text-xl leading-7 font-medium text-neutral-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border-b-2 border-neutral-100 py-2 text-lg transition outline-none focus:border-yellow-400"
      />
    </div>
  );
}
