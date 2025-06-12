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
import StartProgram from "./StartProgram";
import { type Program } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import { snakeToNormal } from "@/utils";
import { format } from "date-fns";
import { PSYCOMETRIC_TESTS } from "@/constant";
import PsychometricTests from "./PsycometricTestList";
import ChooseTimeslot from "../../ChooseTimeslotModal";

type ProgramDetailsProps = {
  programDetails: Program;
};

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({
  programDetails,
}) => {
  // get enrollmentId from url
  const searchParams = useSearchParams();
  const enrollmentId = searchParams?.get("enrollmentId");

  const { data: enrollmentDetails } = api.programEnrollment.getOne.useQuery(
    { id: enrollmentId! },
    { enabled: !!enrollmentId },
  );

  if (!enrollmentId) return null;

  return (
    <div className="container">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="section_heading">{programDetails.name}</h1>
        <Badge variant={enrollmentDetails?.scheduledAt ? "outline" : "default"}>
          {enrollmentDetails?.scheduledAt ? "Scheduled" : "Not Scheduled"}
        </Badge>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
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
                    Duration:{" 60 mins"}
                    {/* {enrollmentDetails?.duration
                      ? `${enrollmentDetails.duration} mins`
                      : "-"} */}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">Instructions:</h3>
                <p>{programDetails?.description}</p>
              </div>
              <div className="mt-6"></div>

              {/* Psycometric TEsts
              {enrollmentDetails?.includePsycometric && (
                <div>
                  <h3 className="mb-2 font-semibold">Psycometric Tests</h3>
                  <div>
                    <ol>
                      {Object.entries(PSYCOMETRIC_TESTS).map(([key, value]) => (
                        <li key={key} className="flex items-center space-x-2">
                          {value}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )} */}
              {enrollmentDetails && (
                <PsychometricTests enrollmentDetails={enrollmentDetails} />
              )}
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
                <div className="mt-6">
                  <h3 className="mb-2 font-semibold">Meeting Details</h3>
                  <div>
                    Time:{" "}
                    {enrollmentDetails.scheduledAt ? (
                      format(
                        enrollmentDetails.scheduledAt,
                        "dd MMM, yyyy hh:mm a",
                      )
                    ) : (
                      <ChooseTimeslot
                        enrollmentId={enrollmentDetails.id}
                        includePsycometric={
                          enrollmentDetails.includePsycometric
                        }
                        coachId={enrollmentDetails.assignedCoach}
                      />
                    )}
                  </div>
                  <div>
                    Link:{" "}
                    {enrollmentDetails.meetingUrl ?? (
                      <span className="text-sm text-gray-500">Not yet</span>
                    )}
                  </div>
                </div>
              ) : null}


              {enrollmentDetails?.meetingUrl && enrollmentDetails?.assignedCoach && enrollmentDetails?.scheduledAt && (<div className="mt-6">
                
               <StartProgram
                  programDetails={programDetails}
                  enrollmentId={enrollmentId}
                  meetingUrl={enrollmentDetails?.meetingUrl}
                />
              </div>)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="section_card">
            <h3 className="text-xl font-semibold">Feedback</h3>
            <div className="mt-4">
              {enrollmentDetails?.feedback ? (
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {enrollmentDetails.feedback}
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
