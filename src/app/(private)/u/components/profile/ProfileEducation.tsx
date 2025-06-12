"use client";

import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { type GetOneUserResponse } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  highestQualification: z.string().optional(),
  specialization: z.string().optional(),
  college: z.string().optional(),
  passingYear: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileEducationProps {
  isLoading: boolean;
  data: GetOneUserResponse;
}

export default function ProfileEducation({
  isLoading,
  data,
}: ProfileEducationProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      highestQualification: "",
      specialization: "",
      college: "",
      passingYear: "",
    },
  });

  const utils = api.useUtils();
  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Education updated successfully");
      void utils.user.getOne.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update education");
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        highestQualification: data.highestQualification ?? "",
        specialization: data.specialization ?? "",
        college: data.college ?? "",
        passingYear: data.passingYear ?? "",
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!data?.id) return;

    const payload = {
      id: data.id,
      highestQualification: values.highestQualification,
      specialization: values.specialization,
      college: values.college,
      passingYear: values.passingYear,
    };

    // updateMutation.mutate(payload);
    
  await updateMutation.mutateAsync(payload);  
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Educational Background</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div className="space-y-2" key={i}>
                    <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                    <div className="h-10 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-[120px] animate-pulse rounded bg-muted" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Highest Education</Label>
                  <Controller
                    name="highestQualification"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iti_diploma">
                            ITI / Diploma
                          </SelectItem>
                          <SelectItem value="ba">
                            B.A. (Bachelor of Arts)
                          </SelectItem>
                          <SelectItem value="bsc">
                            B.Sc. (Bachelor of Science)
                          </SelectItem>
                          <SelectItem value="bcom">
                            B.Com. (Bachelor of Commerce)
                          </SelectItem>
                          <SelectItem value="btech_be">
                            B.Tech / B.E. (Bachelor of Technology / Engineering)
                          </SelectItem>
                          <SelectItem value="bba">
                            BBA (Bachelor of Business Administration)
                          </SelectItem>
                          <SelectItem value="bca">
                            BCA (Bachelor of Computer Applications)
                          </SelectItem>
                          <SelectItem value="bpharm">
                            B. Pharm (Bachelor of Pharmacy)
                          </SelectItem>
                          <SelectItem value="llb">
                            L.L.B (Bachelor of Laws)
                          </SelectItem>
                          <SelectItem value="ma">
                            M.A. (Master of Arts)
                          </SelectItem>
                          <SelectItem value="msc">
                            M.Sc. (Master of Science)
                          </SelectItem>
                          <SelectItem value="mcom">
                            M.Com. (Master of Commerce)
                          </SelectItem>
                          <SelectItem value="mtech_me">
                            M.Tech / M.E. (Master of Technology / Engineering)
                          </SelectItem>
                          <SelectItem value="mba">
                            MBA (Master of Business Administration)
                          </SelectItem>
                          <SelectItem value="mca">
                            MCA (Master of Computer Applications)
                          </SelectItem>
                          <SelectItem value="mpharm">
                            M. Pharm (Master of Pharmacy)
                          </SelectItem>
                          <SelectItem value="llm">
                            L.L.M (Master of Laws)
                          </SelectItem>
                          <SelectItem value="phd">
                            Ph.D. (Doctor of Philosophy)
                          </SelectItem>
                          <SelectItem value="ca">
                            CA (Chartered Accountant)
                          </SelectItem>
                          <SelectItem value="cs">
                            CS (Company Secretary)
                          </SelectItem>
                          <SelectItem value="cfa">
                            CFA (Chartered Financial Analyst)
                          </SelectItem>
                          <SelectItem value="cpa">
                            CPA (Certified Public Accountant)
                          </SelectItem>
                          <SelectItem value="other">
                            Other (please specify)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Controller
                    name="specialization"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arts_humanities">
                            Arts & Humanities
                          </SelectItem>
                          <SelectItem value="business_admin">
                            Business Administration
                          </SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="human_resources">
                            Human Resources
                          </SelectItem>
                          <SelectItem value="international_business">
                            International Business
                          </SelectItem>
                          <SelectItem value="supply_chain">
                            Supply Chain Management
                          </SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="electrical_eng">
                            Electrical Engineering
                          </SelectItem>
                          <SelectItem value="mechanical_eng">
                            Mechanical Engineering
                          </SelectItem>
                          <SelectItem value="civil_eng">
                            Civil Engineering
                          </SelectItem>
                          <SelectItem value="chemical_eng">
                            Chemical Engineering
                          </SelectItem>
                          <SelectItem value="it">
                            Information Technology
                          </SelectItem>
                          <SelectItem value="aerospace_eng">
                            Aerospace Engineering
                          </SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="env_science">
                            Environmental Science
                          </SelectItem>
                          <SelectItem value="biotechnology">
                            Biotechnology
                          </SelectItem>
                          <SelectItem value="geology">Geology</SelectItem>
                          <SelectItem value="health_medicine">
                            Health & Medicine
                          </SelectItem>
                          <SelectItem value="social_sciences">
                            Social Sciences
                          </SelectItem>
                          <SelectItem value="education_teaching">
                            Education & Teaching
                          </SelectItem>
                          <SelectItem value="law_legal">
                            Law & Legal Studies
                          </SelectItem>
                          <SelectItem value="creative_arts">
                            Creative Arts & Design
                          </SelectItem>
                          <SelectItem value="architecture">
                            Architecture
                          </SelectItem>
                          <SelectItem value="graphic_design">
                            Graphic Design
                          </SelectItem>
                          <SelectItem value="fashion_design">
                            Fashion Design
                          </SelectItem>
                          <SelectItem value="industrial_design">
                            Industrial Design
                          </SelectItem>
                          <SelectItem value="film_media">
                            Film & Media Studies
                          </SelectItem>
                          <SelectItem value="other">
                            Other (please specify)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    {...register("college")}
                    className={errors.college ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingYear">Passing Year</Label>
                  <Input
                    id="passingYear"
                    type="number"
                    min="1950"
                    max="2030"
                    {...register("passingYear")}
                    className={errors.passingYear ? "border-destructive" : ""}
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
