import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  HiButton,
  HiDropdown,
  HiInput,
  HiInputCheckbox,
  HiInputTextArea,
  HiLabel,
  HiSeparator,
} from "@hidstech/common_components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { ProgramStatus, ProgramType, type Program } from "@prisma/client";
import { api } from "@/trpc/react";
import { programType } from "@/constant";
import toast from "react-hot-toast";
import { type ProgramFeatureType } from "@/types";

const programTypeOptions = Object.entries(programType).map(([key, value]) => ({
  label: value,
  value: key,
}));

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().optional(),
  type: z.object({
    label: z.string().min(1, { message: "Type is required" }),
    value: z.nativeEnum(ProgramType),
  }),
  status: z.object({
    label: z.string().min(1, { message: "Status is required" }),
    value: z.nativeEnum(ProgramStatus),
  }),
  basePrice: z.string().min(1, { message: "Base Price is required" }),
  discount: z.string().optional(),
  highlights: z.array(
    z.object({
      name: z.string().min(1, { message: "Highlight is required" }),
    }),
  ),
  features: z.array(
    z.object({
      title: z.string().min(1, { message: "Feature Title is required" }),
      description: z
        .string()
        .min(1, { message: "Feature Description is required" }),
    }),
  ),
  includePsycometric: z.boolean().optional().default(false),
});

const EditForm = ({
  type,
  data,
  closeModal,
}: {
  type: "edit" | "add";
  data?: Program;
  closeModal: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      features: [{ title: "", description: "" }],
      highlights: [{ name: "" }],
    },
  });
  const { isSubmitting } = form.formState;

  const featuresFieldsArray = useFieldArray({
    control: form.control,
    name: "features",
  });

  const highlightsFieldsArray = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const utils = api.useUtils();

  const createMutation = api.program.create.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Program created successfully");
      closeModal();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.program.getAll.invalidate();
    },
  });

  const updateMutation = api.program.update.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Program updated successfully");
      closeModal();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.program.getAll.invalidate();
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        code: data.code,
        description: data.description,
        type: {
          label: programType[data.type],
          value: data.type,
        },
        status: {
          label: data.status,
          value: data.status,
        },
        basePrice: data.basePrice.toString(),
        discount: data?.discount?.toString(),
        highlights: data.highlights.map((highlight) => ({ name: highlight })),
        features: (data.features as ProgramFeatureType[]).map((feature) => ({
          title: feature?.title ?? "",
          description: feature?.description ?? "",
        })),
        includePsycometric: data.includePsycometric ?? false,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      name: values.name,
      code: values.code,
      description: values.description,
      type: values.type.value,
      status: values.status.value,
      basePrice: parseFloat(values.basePrice),
      discount: values.discount ? parseFloat(values.discount) : 0,
      highlights: values.highlights.map((highlight) => highlight.name),
      features: values.features.map((feature) => ({
        title: feature.title,
        description: feature.description,
      })),
      includePsycometric: values.includePsycometric,
    };
    if (type === "edit" && data?.id) {
      updateMutation.mutate({ id: data.id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleClose = () => {
    closeModal();
    form.reset();
  };

  const handleAddFeature = () => {
    featuresFieldsArray.append({ title: "", description: "" });
  };

  const handleRemoveFeature = (index: number) => {
    featuresFieldsArray.remove(index);
  };

  const handleAddHighlight = () => {
    highlightsFieldsArray.append({ name: "" });
  };

  const handleRemoveHighlight = (index: number) => {
    highlightsFieldsArray.remove(index);
  };

  return (
    <>
      <div className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-4"
          >
            {/* TODO: PLAN To make action button at top with sticky so it's always visible */}
            {/* <div className="sticky top-14 z-10 bg-background py-2">
              <div className="flex justify-end md:col-span-3">
                <HiButton
                  type="submit"
                  title={type === "edit" ? "Update" : "Create"}
                  isLoading={
                    createMutation.isPending || updateMutation.isPending
                  }
                />
              </div>
            </div> */}
            <HiInput
              form={form}
              isSubmitting={isSubmitting}
              label="Name"
              name="name"
              placeholder=" "
            />
            <HiInput
              form={form}
              isSubmitting={isSubmitting}
              label="Program Code"
              name="code"
              placeholder=" "
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <HiDropdown
                form={form}
                label="Program Type"
                name="type"
                placeholder=" "
                options={programTypeOptions}
              />

              <HiDropdown
                form={form}
                label="Status"
                name="status"
                placeholder=" "
                options={[
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ]}
              />
            </div>
            <HiInputCheckbox
              form={form}
              label="Include Psycometric Tests"
              name="includePsycometric"
            />
            <HiInputTextArea
              form={form}
              isSubmitting={isSubmitting}
              label="Description"
              name="description"
              placeholder=" "
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <HiInput
                form={form}
                isSubmitting={isSubmitting}
                label="Base Price (Amount)"
                name="basePrice"
                placeholder=" "
              />

              <HiInput
                form={form}
                isSubmitting={isSubmitting}
                label="Discount (Amount) "
                name="discount"
                placeholder=" "
              />
            </div>

            <HiSeparator className="mb-[36px_!important] mt-[40px_!important]" />

            {/* highlights */}
            <div className="space-y-4">
              <HiLabel>Highlights</HiLabel>
              {highlightsFieldsArray.fields?.map((field, index) => (
                <div key={field.id} className="flex items-center gap-4">
                  <HiInput
                    form={form}
                    isSubmitting={isSubmitting}
                    // label="Highlight"
                    name={`highlights.${index}.name`}
                    placeholder=" "
                  />
                  <HiButton
                    type="button"
                    variant="destructive-outline"
                    onClick={() => handleRemoveHighlight(index)}
                  >
                    Remove
                  </HiButton>
                </div>
              ))}
              <div className="mt-4 flex justify-start">
                <HiButton
                  type="button"
                  variant="outline"
                  onClick={handleAddHighlight}
                >
                  Add Highlight
                </HiButton>
              </div>
            </div>

            {/* separator */}
            <HiSeparator className="mb-[36px_!important] mt-[40px_!important]" />

            {/* features */}
            <div className="space-y-4">
              <HiLabel>Features</HiLabel>
              {featuresFieldsArray.fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 gap-4">
                  <HiInput
                    form={form}
                    isSubmitting={isSubmitting}
                    placeholder="Feature Title"
                    name={`features.${index}.title`}
                  />
                  <HiInputTextArea
                    form={form}
                    isSubmitting={isSubmitting}
                    placeholder="Feature Description"
                    name={`features.${index}.description`}
                  />

                  <div className="flex justify-end">
                    <HiButton
                      type="button"
                      variant="destructive-outline"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      Remove
                    </HiButton>
                  </div>
                </div>
              ))}

              <div className="flex justify-start">
                <HiButton
                  type="button"
                  variant="outline"
                  onClick={handleAddFeature}
                >
                  Add Feature
                </HiButton>
              </div>
            </div>

            <div className="flex justify-end md:col-span-3">
              <HiButton
                type="submit"
                title={type === "edit" ? "Update" : "Create"}
                isLoading={createMutation.isPending || updateMutation.isPending}
              />
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditForm;
