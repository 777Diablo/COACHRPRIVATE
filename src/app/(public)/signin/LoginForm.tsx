"use client";

import {
  Form,
  HiButton,
  HiInput,
  HiInputPassword,
} from "@hidstech/common_components";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  // const cb =
  const searchParams = useSearchParams();
  const cb = searchParams.get("cb");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await signIn("user-login", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: cb ? cb : "/u",
      });

      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to Signin, Please try again");
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <HiInput name="email" form={form} label="Email" />
          <HiInputPassword name="password" form={form} label="Password" />
          <div className="pt-4">
            <HiButton type="submit" className="w-full" isLoading={loading}>
              Login
            </HiButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
