"use client";

import {
  Form,
  HiButton,
  HiDropdown,
  HiInput,
  HiInputTextArea,
} from "@hidstech/common_components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid mobile number"),
  message: z.string(),
  program: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

const Enquiry = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
      program: { value: "", label: "" },
    },
  });

  const [loading, setLoading] = useState(false);

  const { mutateAsync, isPending } = api.inquiry.create.useMutation();
  const { data, ...programResults } = api.program.getAllPublic.useQuery();

  const programOptions =
    data?.programs?.map((item) => ({ label: item.name, value: item.id })) ?? [];

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const payload = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      message: data.message,
      programId: data?.program?.value,
    };

    try {
      await mutateAsync(payload);
      toast.success("Enquiry sent successfully");
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  // if (isLoading) {
  //   return <div className="w-full "><HiTableLoader /></div>;
  // }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <HiInput name="name" form={form} label="Name" required />
          <HiInput name="email" form={form} label="Email" required />
          <HiInput name="mobile" form={form} label="Mobile" required />
          <HiDropdown
            name="program"
            form={form}
            label="Program"
            options={programOptions}
            isLoading={programResults.isLoading}
            fullWidth
          />
        </div>
        <HiInputTextArea name="message" form={form} label="Message" />
        <div className="pt-4">
          <HiButton
            type="submit"
            className="w-full"
            isLoading={loading || programResults.isLoading || isPending}
          >
            Send
          </HiButton>
        </div>
      </form>
    </Form>
  );
};

export default Enquiry;
