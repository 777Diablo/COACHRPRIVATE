interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  hasError?: boolean;
  disabled?: boolean;
}

export const SelectInput = ({
  value,
  onChange,
  options,
  hasError = false,
  disabled = false,
}: SelectInputProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full rounded-md border p-2 ${
      hasError ? "border-red-500" : ""
    } ${disabled ? "bg-gray-100" : ""}`}
    disabled={disabled}
  >
    <option value="">Select an option</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
