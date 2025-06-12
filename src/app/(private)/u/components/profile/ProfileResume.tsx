"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Download, Loader2 } from "lucide-react";
import { api } from "@/trpc/react";
import { type GetOneUserResponse } from "@/types";
import { HiSkeleton } from "@hidstech/common_components";
import toast from "react-hot-toast";

interface ProfileResumeProps {
  isLoading: boolean;
  data: GetOneUserResponse | null;
}

export default function ProfileResume({ isLoading, data }: ProfileResumeProps) {
  const [isUploading, setIsUploading] = useState(false);
  const utils = api.useUtils();

  const updateMutation = api.user.update.useMutation({
    onMutate: async (newData) => {
      if (!data?.id) return;

      await utils.user.getOne.cancel({ id: data.id });
      const previousUser = utils.user.getOne.getData({ id: data.id });

      utils.user.getOne.setData({ id: data.id }, (old) => {
        if (!old) return old;

        const normalizedCertifications =
          old.certifications?.map((c) => ({
            ...c,
            expiration: c.expiration ?? null,
          })) || [];

        return {
          ...old,
          ...newData,
          certifications: normalizedCertifications,
        };
      });

      return { previousUser };
    },
    onError: (err, _, context) => {
      if (context?.previousUser && data?.id) {
        utils.user.getOne.setData({ id: data.id }, context.previousUser);
      }
      toast.error(err.message || "Failed to update resume");
    },
    onSuccess: () => {
      toast.success("Resume updated successfully");
    },
    onSettled: () => {
      if (data?.id) {
        void utils.user.getOne.invalidate({ id: data.id });
      }
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!data?.id) return;
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        await updateMutation.mutateAsync({
          id: data.id,
          resume: base64,
        });
      } catch (error) {
        toast.error("Failed to upload resume"); 
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    if (!data?.id) return;
    try {
      await updateMutation.mutateAsync({
        id: data.id,
        resume: undefined,
      });
      toast.success("Resume removed successfully");
    } catch (error) {
      toast.error("Failed to remove resume");
    }
  };

  const handleDownload = () => {
    if (data?.resume) {
      toast.success("Downloading resume...");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <HiSkeleton className="h-32 w-full" />
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading || !data}
                />
                <label
                  htmlFor="resume"
                  className="block cursor-pointer space-y-4"
                >
                  {isUploading ? (
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">
                          {data?.resume ? "Replace Resume" : "Upload Resume"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PDF or Word documents (MAX 5MB)
                        </p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {data?.resume && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-accent/10 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <File className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Current Resume</p>
                        <p className="text-sm text-muted-foreground">
                          Click to download
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemove}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        onClick={handleDownload}
                      >
                        <a href={data.resume ?? "#"} download="resume">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
