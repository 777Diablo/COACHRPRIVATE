"use client";
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FORM_CONFIG,
  FormFieldConfig,
  FormType,
} from "@/registration-form-config";
import { FormField } from "./FormField";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { type GetOneUserResponse } from "@/types";

export const DynamicForm = ({
  formType,
  userData,
}: {
  formType: FormType;
  userData: GetOneUserResponse | null;
}) => {
  const fields = FORM_CONFIG[formType];
  const utils = api.useUtils();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createValidationSchema(fields)),
    defaultValues: createDefaultValues(fields, userData),
  });

  const updateMutation = api.user.update.useMutation({
    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await utils.user.getOne.invalidate();
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to update profile");
    },
  });

  useEffect(() => {
    if (userData) reset(createDefaultValues(fields, userData));
  }, [userData, reset, fields]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submission data:", data);
    if (!userData?.id) return;

    const payload = Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (value instanceof File) {
          const reader = new FileReader();
          reader.readAsDataURL(value);
          reader.onload = () => {
            acc[key] = reader.result;
          };
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, unknown>,
    );

    updateMutation.mutate({
      id: userData.id,
      ...payload,
    });
  });

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-2xl p-6">
      {fields.map((fieldConfig, index) => (
        <FormField
          // key={fieldConfig.name}
          key={`${fieldConfig.name}-${index}`}
          fieldConfig={fieldConfig}
          control={control}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      ))}
      <button
        type="submit"
        disabled={isSubmitting ?? updateMutation.isPending}
        className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {updateMutation.isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

function createDefaultValues(
  fields: FormFieldConfig[],
  userData: GetOneUserResponse | null,
) {
  return fields.reduce(
    (acc, field) => {
      const value = userData?.[field.name as keyof GetOneUserResponse];

      if (field.type === "multiselect" || field.type === "objectarray") {
        acc[field.name] = Array.isArray(value) ? value : [];
      } else {
        acc[field.name] = value ?? "";
      }

      return acc;
    },
    {} as Record<string, any>,
  );
}

function createValidationSchema(fields: FormFieldConfig[]) {
  return z.object(
    fields.reduce(
      (schema, field) => {
        let validator: z.ZodTypeAny = z.any();

        if (field.required) {
          validator = z.any().refine((val) => {
            if (Array.isArray(val)) return val.length > 0;
            return !!val;
          }, `${field.name} is required`);
        }

        switch (field.type) {
          case "email":
            validator = z.string().email();
            break;
          case "number":
            validator = z.number();
            break;
          case "multiselect":
            validator = z.array(z.string());
            break;
          case "objectarray":
            const subSchema = createValidationSchema(field.subFields ?? []);
            validator = z.array(subSchema);
            break;
        }

        return { ...schema, [field.name]: validator };
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  );
}
