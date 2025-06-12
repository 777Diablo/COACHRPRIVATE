"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/trpc/react";
import { type GetOneUserResponse } from "@/types";
import { HiSkeleton } from "@hidstech/common_components";
import { useEffect } from "react";

const formSchema = z.object({
  currentJobRole: z.string().optional(),
  yearsOfExperience: z.number().min(0).max(50).optional(),
  industry: z.string().optional(),
  currentEmployer: z.string().optional(),
  previousRoles: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileCareerProps {
  isLoading: boolean;
  data: GetOneUserResponse;
}

export default function ProfileCareer({ isLoading, data }: ProfileCareerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentJobRole: "",
      yearsOfExperience: undefined,
      industry: "",
      currentEmployer: "",
      previousRoles: "",
    },
  });

  const utils = api.useUtils();

  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Career information updated successfully");
      void utils.user.getOne.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update career information");
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        currentJobRole: data.currentJobRole ?? "",
        yearsOfExperience: data.yearsOfExperience ?? undefined,
        industry: data.industry ?? "",
        currentEmployer: data.currentEmployer ?? "",
        previousRoles: data.previousRoles ?? "",
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!data?.id) return;

    const payload = {
      id: data.id,
      currentJobRole: values.currentJobRole,
      yearsOfExperience: values.yearsOfExperience,
      industry: values.industry,
      currentEmployer: values.currentEmployer,
      previousRoles: values.previousRoles,
    };

    await updateMutation.mutateAsync(payload);
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Career Information</CardTitle>
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
              <div className="space-y-2">
                <HiSkeleton className="h-4 w-1/3" />
                <HiSkeleton className="h-20 w-full" />
              </div>
              <HiSkeleton className="h-10 w-[120px]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentJobRole">Current Job Role</Label>
                  <Input
                    id="currentJobRole"
                    {...register("currentJobRole")}
                    className={
                      errors.currentJobRole ? "border-destructive" : ""
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    min="0"
                    max="50"
                    {...register("yearsOfExperience", {
                      valueAsNumber: true,
                    })}
                    className={
                      errors.yearsOfExperience ? "border-destructive" : ""
                    }
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    {...register("industry")}
                    className={errors.industry ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentEmployer">Current Employer</Label>
                  <Input
                    id="currentEmployer"
                    {...register("currentEmployer")}
                    className={
                      errors.currentEmployer ? "border-destructive" : ""
                    }
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousRoles">Previous Roles/Experience</Label>
                <Textarea
                  id="previousRoles"
                  {...register("previousRoles")}
                  className={errors.previousRoles ? "border-destructive" : ""}
                  rows={4}
                  placeholder="Describe your previous roles and responsibilities..."
                  disabled={isSubmitting}
                />
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
