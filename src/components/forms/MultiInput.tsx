

interface MultiInputProps {
  values: string[] | null | undefined;
  onChange: (values: string[]) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export const MultiInput = ({
  values = [],
  onChange,
  disabled = false,
  hasError = false,
}: MultiInputProps) => {
  
  // console.log("MultiInput values:", values);
  
  
  const safeValues = Array.isArray(values) ? values : [];

  const handleAdd = () => onChange([...safeValues, ""]);
  const handleRemove = (index: number) =>
    onChange(safeValues.filter((_, i) => i !== index));
  const handleChange = (index: number, value: string) => {
    const newValues = [...safeValues];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      {safeValues.map((value, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            className={`flex-1 p-2 border rounded-md ${
              hasError ? "border-red-500" : ""
            } ${disabled ? "bg-gray-100" : ""}`}
            disabled={disabled}
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="px-3 text-red-500 hover:bg-red-50 rounded-md"
            disabled={disabled}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-blue-500 hover:text-blue-700 text-sm"
        disabled={disabled}
      >
        Add Item
      </button>
    </div>
  );
};