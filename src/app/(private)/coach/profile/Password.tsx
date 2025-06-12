'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { Form, HiButton, HiInput, HiInputPassword, HiSkeleton } from "@hidstech/common_components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { api } from "@/trpc/react";
import toast from "react-hot-toast";


const formSchema = z.object({
    oldPassword: z.string().min(6, { message: "Old Password is required" }),
    password: z.string().min(6, { message: "Password is required" }),
});

const Password = ({ isLoading, userId }: { isLoading: boolean, userId: string }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            password: ""
        },
    });
    const { isSubmitting } = form.formState;

    const utils = api.useUtils();

    const updateMutation = api.user.updatePassword.useMutation({
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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const payload = {
            oldPassword: values.oldPassword,
            password: values.password
        };
        updateMutation.mutate(payload);
    };


    return (
        <div className='section_card'>
            <h1 className="section_heading mb-2">Change Password</h1>

            {isLoading ? <div className="space-y-4">
                <HiSkeleton className="h-10 w-full" />
                <HiSkeleton className="h-10 w-full" />
            </div>
                :
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <HiInputPassword
                                name="oldPassword"
                                form={form}
                                label="Old Password"
                                placeholder="Old Password"
                            />

                            <HiInputPassword
                                name="password"
                                form={form}
                                label="New Password"
                                placeholder="New Password"
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

export default Password;