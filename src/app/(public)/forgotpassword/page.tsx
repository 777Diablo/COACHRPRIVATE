"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import {
    HiButton,
    HiInput,
    HiInputPassword,
    Form,
} from "@hidstech/common_components";



const formSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(4, "OTP must be at least 4 characters"),
    password: z.string(),
    repassword: z.string(),
});



export default function ForgotForm() {
    const { mutateAsync } = api.user.forgotPassword.useMutation();

    const [loading, setLoading] = React.useState(false);

    const [otpBtnLabel, setOtpBtnLabel] = React.useState("Send OTP");
    const [verifyBtnLabel, setVerifyBtnLabel] = React.useState("Verify OTP");

    const [otpSent, setOtpSent] = React.useState(false);
    const [otpVerified, setOtpVerified] = React.useState(false);

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
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const sendOtp = async () => {

        const email = form.getValues("email");
        const password = form.getValues("password");

        if (!email) {
            toast.error("Please fill in Email first");
            return;
        }

        try {
            setOtpBtnLabel("Sending...");

            const res = await fetch("/api/sendmail", {
                method: "POST",
                body: JSON.stringify({ email }),
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




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            otp: "",
            password: "",
            repassword: "",
        },
    });


    const verifyotp = async () => {
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
        else {
            setOtpVerified(true);
            setVerifyBtnLabel("Otp Verified");

        }
    }



    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);

        console.log("yes its here")
        if (data.password !== data.repassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await mutateAsync({
                email: data.email,
                password: data.password,
            });

            toast.success("Password updated successfully!");
            // form.reset();
          
        } catch (err) {
            toast.error("Failed to update password");
        } finally {
            setLoading(false);
              setOtpVerified(false);
            setOtpSent(false);
        }
    };



    return (
        <>
            <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">Forgot Password</h3>
                                <Form {...form}>
                                    <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>

                                        <HiInput name="email" form={form} label="Email" className="dark:bg-slate-700" />

                                        <HiInput
                                            className="dark:bg-slate-700"
                                            name="otp"
                                            form={form}
                                            label="OTP"
                                            disabled={timeLeft <= 0}
                                        />

                                        <div >
                                            <HiButton className="text-xs  " type="button" onClick={sendOtp}>
                                                {otpBtnLabel}
                                            </HiButton>

                                            <HiButton className="text-xs float-right " type="button" onClick={verifyotp}>
                                                {verifyBtnLabel}
                                            </HiButton></div>

                                        <HiInputPassword name="password" form={form} isSubmitting={!otpVerified} label="Password" className="dark:bg-slate-700" />
                                        <HiInputPassword name="repassword" form={form} isSubmitting={!otpVerified} label="Retype Password" className="dark:bg-slate-700" />

                                        <div className="pt-4">
                                            <HiButton type="submit" className="w-full"  >
                                                Change Password
                                            </HiButton>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute left-0 top-0 z-[-1]">
                    <svg
                        width="1440"
                        height="969"
                        viewBox="0 0 1440 969"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask
                            id="mask0_95:1005"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="1440"
                            height="969"
                        >
                            <rect width="1440" height="969" fill="#090E34" />
                        </mask>
                        <g mask="url(#mask0_95:1005)">
                            <path
                                opacity="0.1"
                                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                                fill="url(#paint0_linear_95:1005)"
                            />
                            <path
                                opacity="0.1"
                                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                                fill="url(#paint1_linear_95:1005)"
                            />
                        </g>
                        <defs>
                            <linearGradient
                                id="paint0_linear_95:1005"
                                x1="1178.4"
                                y1="151.853"
                                x2="780.959"
                                y2="453.581"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_95:1005"
                                x1="160.5"
                                y1="220"
                                x2="1099.45"
                                y2="1192.04"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4A6CF7" />
                                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </section>
        </>
    );

}
