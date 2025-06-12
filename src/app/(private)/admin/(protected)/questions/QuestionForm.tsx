import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, HiButton, HiInput } from "@hidstech/common_components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { ProgramStatus, ProgramType, type Question } from "@prisma/client";
import { api } from "@/trpc/react";
import { programType } from "@/constant";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  duration: z
    .string()
    .min(1, { message: "Duration is required" })
    .transform(Number),
  tags: z.array(z.string()), // Optional array of strings
});

const QuestionForm = ({
  type,
  data,
  closeModal,
}: {
  type: "edit" | "add";
  data?: Question;
  closeModal: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: 0,
      tags: [],
    },
  });
  const { isSubmitting } = form.formState;

  const [tags, setTags] = useState<string[]>([]);

  const utils = api.useUtils();

  const createMutation = api.question.create.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Created successfully");
      closeModal();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.question.getAll.invalidate();
    },
  });

  const updateMutation = api.question.update.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Updated successfully");
      closeModal();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.question.getAll.invalidate();
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        duration: data?.duration ? data.duration : 0,
        tags: data.tags,
      });
      setTags(data.tags || []);
    }
  }, [data]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      form.setValue("tags", updatedTags); // string[] is fine for the form
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      name: values.name,
      duration: values.duration,
      tags,
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
    setTags([]);
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              type="number"
              label="Duration (in seconds)"
              name="duration"
              placeholder=" "
            />

            {/* Tag Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const newTag = e.currentTarget.value.trim();
                      if (newTag) {
                        addTag(newTag);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
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

export default QuestionForm;
