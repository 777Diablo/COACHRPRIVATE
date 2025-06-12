import { FormFieldConfig } from "@/registration-form-config";

interface ObjectArrayInputProps {
  values?: Array<Record<string, any>> | null;
  onChange: (values: Array<Record<string, any>>) => void;
  subFields: FormFieldConfig[];
  disabled?: boolean;
  hasError?: boolean;
}

export const ObjectArrayInput = ({
  values,
  onChange,
  subFields = [],
  disabled = false,
  hasError = false,
}: ObjectArrayInputProps) => {
  const safeValues = Array.isArray(values) ? values : [];

  const handleAdd = () => {
    const newEntry = subFields.reduce(
      (acc, subField) => ({
        ...acc,
        [subField.name]: subField.type === "multiselect" ? [] : "",
      }),
      {} as Record<string, any>,
    );
    onChange([...safeValues, newEntry]);
  };

  const handleRemove = (index: number) => {
    onChange(safeValues.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, fieldName: string, value: any) => {
    const newValues = [...safeValues];

    if (!newValues[index]) {
      newValues[index] = {};
    }

    newValues[index][fieldName] = value;
    onChange(newValues);
  };

  return (
    <div className="space-y-4">
      {safeValues.map((value, index) => (
        <div key={index} className="space-y-2 rounded-md border p-4">
          {subFields.map((subField) => (
            <div key={subField.name} className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                {subField.name}
                {subField.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={subField.type === "date" ? "date" : "text"}
                value={value[subField.name] ?? ""}
                onChange={(e) =>
                  handleChange(index, subField.name, e.target.value)
                }
                disabled={disabled}
                className={`w-full rounded-md border p-2 ${
                  hasError ? "border-red-500" : ""
                }`}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-sm text-red-500 hover:text-red-700"
            disabled={disabled}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="text-sm text-blue-500 hover:text-blue-700"
        disabled={disabled}
      >
        Add Entry
      </button>
    </div>
  );
};
