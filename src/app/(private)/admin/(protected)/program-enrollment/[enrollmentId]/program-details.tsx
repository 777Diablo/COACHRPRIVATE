"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@hidstech/common_components/components/ui/tabs.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hidstech/common_components/components/ui/card.js";
import { Badge } from "@hidstech/common_components/components/ui/badge.js";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@hidstech/common_components/components/ui/avatar.js";
import { CalendarDays, Clock, Video, FileText } from "lucide-react";
// import StartProgram from "./StartProgram";
import { snakeToNormal } from "@/utils";
import { format } from "date-fns";
import MeetingInfo from "./MeetingInfo";
import { api } from "@/trpc/react";
import PsycometricResults from "@/components/ProgramEnrollment/PsycometricResults";

type ProgramDetailsProps = {
  enrollmentId: string;
};

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({
  enrollmentId,
}) => {
  const { data: enrollmentDetails } = api.programEnrollment.getOne.useQuery({
    id: enrollmentId,
  });

  const programDetails = enrollmentDetails?.program;

  if (!enrollmentId) return null;

  return (
    <div className="container" >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="section_heading">{programDetails?.name}</h1>
        <Badge variant={enrollmentDetails?.scheduledAt ? "outline" : "default"}>
          {enrollmentDetails?.scheduledAt ? "Scheduled" : "Not Scheduled"}
        </Badge>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {enrollmentDetails?.includePsycometric && (
            <TabsTrigger value="psycometric-result">
              Psycometrics Test
            </TabsTrigger>
          )}
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Program Overview</CardTitle>
              <CardDescription>{programDetails?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  {programDetails?.type === "video_call_interview" ||
                  programDetails?.type === "video_based_interview" ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span>
                    {programDetails?.type &&
                      snakeToNormal(programDetails?.type)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {" "}
                    {enrollmentDetails?.scheduledAt
                      ? format(
                          enrollmentDetails.scheduledAt,
                          "dd MMM, yyyy hh:mm a",
                        )
                      : "Any Time"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {/* Duration:{" "}
                    {enrollmentDetails?.duration
                      ? `${enrollmentDetails.duration} mins`
                      : "-"} */}
                      Duration:{"60 mins"}

                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">Instructions:</h3>
                <p>{programDetails?.description}</p>
              </div>
              <div className="mt-6"></div>
              {/* Assigned Coach */}
              <div>
                <h3 className="mb-2 font-semibold">Assigned Coach</h3>
                {enrollmentDetails?.assignedCoach ? (
                  <div className="mb-4 flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={enrollmentDetails.coach?.image ?? ""} />
                      <AvatarFallback>
                        {enrollmentDetails.coach?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {enrollmentDetails.coach?.name}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No Coach assigned yet
                  </div>
                )}
              </div>

              {/* meetling link */}
              {enrollmentDetails?.id &&
              programDetails?.type === "video_call_interview" ? (
                <MeetingInfo
                  meetingUrl={enrollmentDetails?.meetingUrl}
                  enrollmentId={enrollmentDetails.id}
                />
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        {enrollmentDetails?.includePsycometric && (
          <TabsContent value="psycometric-result">
            <div className="section_card">
              <PsycometricResults enrollmentId={enrollmentId} />
            </div>
          </TabsContent>
        )}
        <TabsContent value="feedback">
          <div className="section_card">
            <h3 className="text-xl font-semibold">Feedback</h3>
            <div className="mt-4">
              {enrollmentDetails?.feedback ? (
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {enrollmentDetails?.feedback}
                </p>
              ) : (
                <p className="text-sm text-gray-500">No feedback yet</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
