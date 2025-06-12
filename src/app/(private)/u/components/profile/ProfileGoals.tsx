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
import { useEffect } from "react";
import { HiSkeleton } from "@hidstech/common_components";

const formSchema = z.object({
  preferredJobRole: z.string().optional(),
  targetCompanies: z.string().optional(),
  targetLocations: z.string().optional(),
  careerObjectives: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileGoalsProps {
  isLoading: boolean;
  data: GetOneUserResponse;
}

export default function ProfileGoals({ isLoading, data }: ProfileGoalsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredJobRole: "",
      targetCompanies: "",
      targetLocations: "",
      careerObjectives: "",
    },
  });

  const utils = api.useUtils();
  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Career goals updated successfully");
      void utils.user.getOne.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update career goals");
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        preferredJobRole: data.preferredJobRole ?? "",
        targetCompanies: data.targetCompanies ?? "",
        targetLocations: data.targetLocations ?? "",
        careerObjectives: data.careerObjectives ?? "",
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!data?.id) return;

    const payload = {
      id: data.id,
      preferredJobRole: values.preferredJobRole,
      targetCompanies: values.targetCompanies,
      targetLocations: values.targetLocations,
      careerObjectives: values.careerObjectives,
    };

    try {
      
      await updateMutation.mutateAsync(payload);
    } catch (error) {
      toast.error("Failed to save career goals");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Career Goals</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div className="space-y-2" key={i}>
                  <HiSkeleton className="h-4 w-1/3" />
                  {i === 3 ? (
                    <HiSkeleton className="h-20 w-full" />
                  ) : (
                    <HiSkeleton className="h-10 w-full" />
                  )}
                </div>
              ))}
              <HiSkeleton className="h-10 w-[120px]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="preferredJobRole">Preferred Job Role</Label>
                <Input
                  id="preferredJobRole"
                  {...register("preferredJobRole")}
                  className={errors.preferredJobRole ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCompanies">Target Companies</Label>
                <Input
                  id="targetCompanies"
                  {...register("targetCompanies")}
                  className={errors.targetCompanies ? "border-destructive" : ""}
                  placeholder="e.g., Google, Microsoft, Amazon"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetLocations">
                  Job Location Preferences
                </Label>
                <Input
                  id="targetLocations"
                  {...register("targetLocations")}
                  className={errors.targetLocations ? "border-destructive" : ""}
                  placeholder="e.g., Remote, New York, London"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="careerObjectives">Career Objectives</Label>
                <Textarea
                  id="careerObjectives"
                  {...register("careerObjectives")}
                  className={errors.careerObjectives ? "border-destructive" : ""}
                  rows={4}
                  placeholder="Describe your career objectives and goals..."
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
