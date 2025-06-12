import { Controller } from "react-hook-form";
import { SelectInput } from "./SelectInput";
import { MultiInput } from "./MultiInput";
import { type FormFieldConfig } from "@/registration-form-config";
import { ObjectArrayInput } from "./objectArrayInput";

interface FormFieldProps {
  fieldConfig: FormFieldConfig;
  control: any;
  isSubmitting: boolean;
  errors?: any;
}

export const FormField = ({
  fieldConfig,
  control,
  isSubmitting,
  errors,
}: FormFieldProps) => {
  const error = errors?.[fieldConfig.name];

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium capitalize text-gray-700">
        {fieldConfig.name.replace(/([A-Z])/g, " $1").trim()}
        {fieldConfig.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={fieldConfig.name}
        control={control}
        render={({ field }) => {
          switch (fieldConfig.type) {
            case "select":
              return (
                <SelectInput
                  {...field}
                  options={fieldConfig.options ?? []}
                  hasError={!!error}
                  disabled={isSubmitting}
                />
              );

            case "multiselect":
              return (
                <MultiInput
                  values={field.value ?? []}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                  hasError={!!error}
                />
              );

            case "date":
              return (
                <input
                  type="date"
                  {...field}
                  className={`w-full rounded-md border p-2 ${
                    error ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
              );

            case "number":
              return (
                <input
                  type="number"
                  {...field}
                  className={`w-full rounded-md border p-2 ${
                    error ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              );

            case "file":
              return (
                <input
                  type="file"
                  className={`w-full rounded-md border p-2 ${
                    error ? "border-red-500" : ""
                  }`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        field.onChange(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  disabled={isSubmitting}
                />
              );

            case "objectarray":
              return (
                <ObjectArrayInput
                  values={field.value ?? []}
                  onChange={field.onChange}
                  subFields={fieldConfig.subFields ?? []}
                  disabled={isSubmitting}
                  hasError={!!error}
                />
              );

            case "textarea":
              return (
                <textarea
                  {...field}
                  className={`w-full rounded-md border p-2 ${
                    error ? "border-red-500" : ""
                  }`}
                  rows={4}
                  disabled={isSubmitting}
                />
              );

            default:
              return (
                <input
                  type={fieldConfig.type}
                  {...field}
                  className={`w-full rounded-md border p-2 ${
                    error ? "border-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                />
              );
          }
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
