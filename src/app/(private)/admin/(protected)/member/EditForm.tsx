"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  HiButton,
  HiDropdown,
  HiInput,
} from "@hidstech/common_components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { type User } from "@prisma/client";
import { api } from "@/trpc/react";
import { isValidRole, VALID_ROLE } from "@/utils/isValidRole";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().optional(),
    mobile: z.string().min(10, { message: "Invalid Mobile Number" }),
    role: z.object({
      label: z.string(),
      value: z.string(),
    }),
  })
  .refine((data) => isValidRole(data.role?.value), {
    message: "Invalid Role",
  });

const EditForm = ({
  type,
  data,
  closeModal,
}: {
  type: "edit" | "add";
  data?: User;
  closeModal: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSubmitting } = form.formState;

  const utils = api.useUtils();
  const createMutation = api.user.create.useMutation({
    onSuccess: () => {
      toast.success("Member created successfully");
      handleClose();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.user.getAllStaff.invalidate();
    },
  });

  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Member updated successfully");
      handleClose();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.user.getAllStaff.invalidate();
    },
  });

  const roleOptions = Object.entries(VALID_ROLE).map((role) => ({
    label: role[0].toLocaleUpperCase(),
    value: role[1] as string,
  }));

  useEffect(() => {
    if (data) {
      const role = roleOptions.find((option) => option.value === data.role);
      form.reset({
        name: data.name,
        email: data.email,
        mobile: data.mobile ?? " ",
        role: role ?? roleOptions[0],
      });
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
    };

    // isValid Role
    if (!payload.role.value) {
      return toast.error("Role is required");
    }

    if (!isValidRole(payload.role.value)) {
      return alert("Invalid role value");
    }

    if (type === "edit" && data?.id) {
      updateMutation.mutate({
        id: data.id,
        name: payload.name,
        role: payload.role.value,
        mobile: payload.mobile,
      });
    } else {
      if (!payload.password) {
        return toast.error("Password is required");
      }

      createMutation.mutate({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role.value,
        mobile: payload.mobile,
      });
    }
  };

  const handleClose = () => {
    closeModal();
    form.reset();
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
              label="Email"
              name="email"
              placeholder=" "
              disabled={type === "edit"}
            />
            <HiInput
              form={form}
              isSubmitting={isSubmitting}
              label="Mobile"
              name="mobile"
              placeholder=" "
            />
            {type === "add" && (
              <HiInput
                form={form}
                isSubmitting={isSubmitting}
                label="Password"
                name="password"
                placeholder="123456"
              />
            )}

            <HiDropdown
              form={form}
              label="Role"
              name="role"
              options={roleOptions}
            />

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
