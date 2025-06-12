'use client'

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, HiButton, HiInput, HiSkeleton } from "@hidstech/common_components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { type GetOneUserResponse } from "@/types";


const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    mobile: z.string(),
    email: z.string(),
});

const BasicInfo = ({ isLoading, data }: { isLoading: boolean, data: GetOneUserResponse }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            mobile: "",
            email: ""
        },
    });
    const { isSubmitting } = form.formState;

    const utils = api.useUtils();

    const updateMutation = api.user.update.useMutation({
        onSuccess: () => {
            form.reset();
            toast.success("Updated successfully");
        },
        onError: (err) => {
            toast.error(err?.message ?? "Something went wrong");
        },
        onSettled: async () => {
            await utils.user.getOne.invalidate();
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name: data?.name ?? '',
                mobile: data?.mobile ?? '',
                email: data?.email ?? ''
            });
        }
    }, [data]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if(!data?.id) return;

        const payload = {
            id: data.id,
            name: values.name ?? '',
            mobile: values.mobile ?? '',
        };
        updateMutation.mutate(payload);
    };


    return (
        <div className='section_card'>
            <h1 className="font-bold text-3xl">Basic Information</h1>
            {isLoading ? <div className="space-y-4">
                <HiSkeleton className="h-10 w-full" />
                <HiSkeleton className="h-10 w-full" />
                <HiSkeleton className="h-10 w-full" />
            </div>
                :
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <HiInput
                                form={form}
                                isSubmitting={isSubmitting}
                                label="Email"
                                name="email"
                                placeholder=" "
                                disabled
                            />
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
                                label="Mobile"
                                name="mobile"
                                placeholder=" "
                            />

                            <div className="flex justify-end md:col-span-3">
                                <HiButton
                                    type="submit"
                                    title="Update"
                                    isLoading={updateMutation.isPending}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            }

        </div>
    )
};

export default BasicInfo;