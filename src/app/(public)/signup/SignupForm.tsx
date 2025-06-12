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
import { api } from "@/trpc/react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z.string().min(10, { message: "Invalid Mobile Number" }),
  email: z.string().email(),
  otp: z.string().min(4, "OTP must be at least 4 characters"),
  password: z.string(),
});

const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
      name: "",
      mobile: "",
    },
  });

  const { mutateAsync } = api.user.createCustomer.useMutation();
  const [loading, setLoading] = React.useState(false);
  const [otpBtnLabel, setOtpBtnLabel] = React.useState("Send OTP");
  const [otpSent, setOtpSent] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState<number>(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startOtpTimer = () => {
    setTimeLeft(60); // 5 minutes
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setOtpSent(false);
          setOtpBtnLabel("Resend OTP");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) 
        
        {

          clearInterval(timerRef.current);
        
        }
    };
  }, []);

  const sendOtp = async () => {
    const email = form.getValues("email");
    const password = form.getValues("password");

    if (!email || !password) {
      toast.error("Please fill in Email and Password first");
      return;
    }

    try {
      setOtpBtnLabel("Sending...");
      const res = await fetch("/api/sendmail", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (result.success) {
        toast.success("OTP sent to your email");
        setOtpBtnLabel("Resend OTP");
        setOtpSent(true);
        startOtpTimer();
      } else {
        toast.error("Failed to send OTP");
        setOtpBtnLabel("Send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP");
      setOtpBtnLabel("Send OTP");
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (!otpSent || timeLeft <= 0) {
      toast.error("OTP expired or not sent");
      setLoading(false);
      return;
    }

    try {

      //email verify block
     { 
      const email = form.getValues("email");
      const otp = form.getValues("otp");

      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!result.success) {
        toast.error("Invalid or expired OTP");
        setLoading(false);
        return;
      }
    }

      const response = await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
      });

      toast.success("User Registered Successfully");

      signIn("user-login", {
        email: data.email,
        password: data.password,
      })
        .then(() => {
          toast.success("You are logged in");
          window.location.href = "/u";
        })
        .catch(() => {
          toast.error("Failed to Signin, Please try again");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("User Registration Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <HiInput name="name" form={form} label="Name" className="dark:bg-slate-700" />
          <HiInput name="email" form={form} label="Email" className="dark:bg-slate-700" />
          
          <HiInput
            className="dark:bg-slate-700"
            name="otp"
            form={form}
            label="OTP"
            disabled={!otpSent || timeLeft <= 0}
          />
          
          <HiButton className="text-xs" type="button" onClick={sendOtp}>
            {otpBtnLabel}
          </HiButton>

          {otpSent && timeLeft > 0 && (
            <p className="text-sm text-gray-500">
              OTP expires in: {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          )}

          <HiInput name="mobile" form={form} label="Mobile No" className="dark:bg-slate-700" />
          <HiInputPassword name="password" form={form} label="Password" className="dark:bg-slate-700" />

          <div className="pt-4">
            <HiButton type="submit" className="w-full" isLoading={loading}>
              Register
            </HiButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
