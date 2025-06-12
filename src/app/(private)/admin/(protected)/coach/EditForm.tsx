"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, HiButton, HiInput } from "@hidstech/common_components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { type User } from "@prisma/client";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().optional(),
  mobile: z.string().min(10, { message: "Invalid Mobile Number" }).optional(),
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

  const [newSlot, setNewSlot] = useState({
    start: "",
    end: "",
  });

  const utils = api.useUtils();

  const slotCreateMutation =  api.meetingSlot.create.useMutation({
      onSuccess: async () => {
        await utils.meetingSlot.getAll.invalidate();
        toast.success("Slot created successfully");
      },
      onError: (err) => {
        toast.error(err.message ?? "Slot creation failed");
      },
    });
  const createMutation = api.user.create.useMutation({
    onSuccess: () => {
      toast.success("Coach created successfully");
      handleClose();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.user.getUsersByRole.invalidate();
    },
  });

  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Coach updated successfully");
      handleClose();
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
    onSettled: async () => {
      await utils.user.getUsersByRole.invalidate();
    },
  });



  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        email: data.email,
        mobile: data?.mobile ?? undefined,
      });
    }
  }, [data]);

  const createSlotMutation = api.meetingSlot.create.useMutation({
    onSuccess: () => toast.success("Slot created successfully"),
    onError: (err) => toast.error(err?.message ?? "Failed to create slot"),
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {







    const payload = {
      ...values,
    };

    // Slot validation
    const start = new Date(newSlot.start);
    const end = new Date(newSlot.end);
    const now = new Date();

    const isFutureStart = start > now;
    const isFutureEnd = end > now;
    const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

   if (type === "edit" && data?.id) {
  if (newSlot.start && newSlot.end) {
    const startTime = new Date(newSlot.start);
    const endTime = new Date(newSlot.end);
    const now = new Date();

    if (startTime < now || endTime <= startTime) {
      toast.error("Invalid start or end time.");
      return;
    }

    // Round start time to next full hour if minutes > 0
    const correctedStart = new Date(startTime);
    if (correctedStart.getMinutes() > 0) {
      correctedStart.setHours(correctedStart.getHours() + 1);
      correctedStart.setMinutes(0, 0, 0);
    }

    // Round end time down to the hour
    const correctedEnd = new Date(endTime);
    correctedEnd.setMinutes(0, 0, 0);

    // Final diff check after correcting time
    const totalHours = (correctedEnd.getTime() - correctedStart.getTime()) / (1000 * 60 * 60);
    if (totalHours > 4) {
      toast.error("Total slot time cannot exceed 4 hours.");
      return;
    }

    const slots = [];
    let currentStart = new Date(correctedStart);
    while (currentStart < correctedEnd) {
      const currentEnd = new Date(currentStart);
      currentEnd.setHours(currentEnd.getHours() + 1);

      slots.push({
        startTime: new Date(currentStart),
        endTime: new Date(currentEnd),
        coachId: data.id,
      });

      currentStart = currentEnd;
    }

    for (const slot of slots) {
      await slotCreateMutation.mutateAsync(slot);
    }

    toast.success("Slots created successfully");
    setNewSlot({ start: "", end: "" });
  }

  updateMutation.mutate({
    id: data.id,
    name: payload.name,
    mobile: payload.mobile,
  });
}else {
      if (!payload.password) {
        return toast.error("Password is required");
      }

      if (!payload.mobile) {
        return toast.error("Mobile is required");
      }

      createMutation.mutate({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: "coach",
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
            <div className="text-white text-white text-sm font-semibold rounded">Add Slot</div>
            <div className="section_card mb-2">

              <input
                type="datetime-local"
                value={newSlot.start}
                onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
                className="mr-2 border p-2"
              />
              <input
                type="datetime-local"
                value={newSlot.end}
                onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
                className="mr-2 border p-2"
              />

            </div>
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
