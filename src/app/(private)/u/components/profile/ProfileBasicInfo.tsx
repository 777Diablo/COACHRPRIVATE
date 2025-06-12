"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";
import { type GetOneUserResponse } from "@/types";
import { HiSkeleton } from "@hidstech/common_components";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hidstech/common_components/components/ui/avatar.js";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileBasicInfoProps {
  isLoading: boolean;
  data: GetOneUserResponse;
}

export default function ProfileBasicInfo({
  isLoading,
  data,
}: ProfileBasicInfoProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
    },
  });

  const utils = api.useUtils();
  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Updated successfully");
      void utils.user.getOne.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      const nameParts = data.name?.split(" ") ?? ["", ""];
      reset({
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" ") ?? "",
        mobile: data.mobile ?? "",
        city: data.city ?? "",
        country: data.country ?? "",
      });
    }
  }, [data, isLoading, reset]);

  
const onSubmit = (values: FormValues) => { 
  if (!data?.id) return;

  const payload = {
    id: data.id,
    name: `${values.firstName} ${values.lastName}`.trim(),
    mobile: values.mobile ?? "",
    city: values.city ?? "",
    country: values.country ?? "",
  };

  updateMutation.mutate(payload); 
};

  //   useEffect(() => {
  //     console.log("GetOneUserResponse Data:", data);
  // }, [data]);

  // useEffect(() => {
  //   if (data) {
  //       console.log("Fields in GetOneUserResponse:", Object.keys(data));
  //   }
  // }, [data]);

  // type FieldNames = keyof GetOneUserResponse;

  // console.log("Data structure:", data);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              {isLoading ? (
                <HiSkeleton className="h-24 w-24 rounded-full" />
              ) : (
                <>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={data?.image ?? undefined} />
                    <AvatarFallback className="text-2xl">
                      {data?.name?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <input
  type="file"
  id="profileImage"
  accept="image/*"
  className="hidden"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file || !data?.id) return;

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        
        void updateMutation.mutate({
          id: data.id,
          image: base64,
        });
      };
    } catch (err) {
      toast.error("Failed to update profile picture");
    }
  }}
  disabled={updateMutation.isPending}
/>

                  <label
                    htmlFor="profileImage"
                    className={`absolute bottom-0 right-0 cursor-pointer rounded-full p-2 ${
                      updateMutation.isPending
                        ? "cursor-not-allowed bg-muted text-muted-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {updateMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </label>
                </>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Upload a profile picture to personalize your account.
                Recommended size: 400x400px.
              </p>
              {data?.image && (
                <Button
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={async () => {
                  if (!data?.id) return;
                  try {
                    
                    void updateMutation.mutate({
                      id: data.id,
                      image: undefined,
                    });
                  } catch (err) {
                    toast.error("Failed to remove profile picture");
                  }
                }}
                disabled={updateMutation.isPending}
              >
                Remove Photo
              </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mx-auto max-w-7xl p-6 lg:p-8">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div className="space-y-2" key={i}>
                    <HiSkeleton className="h-4 w-1/3" />
                    <HiSkeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <HiSkeleton className="h-10 w-[120px]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className={errors.firstName ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className={errors.lastName ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={data?.email ?? ""} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    {...register("mobile")}
                    className={errors.mobile ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.mobile && (
                    <p className="text-sm text-destructive">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register("country")}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
