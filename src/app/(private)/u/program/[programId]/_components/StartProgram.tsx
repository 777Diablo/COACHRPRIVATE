"use client";

import React from "react";
import { HiButton } from "@hidstech/common_components";
import { useRouter } from "next/navigation";
import { type Program } from "@prisma/client";
import toast from "react-hot-toast";

const StartProgram = ({
  programDetails,
  enrollmentId,
  meetingUrl,
}: {
  programDetails: Program;
  enrollmentId: string;
  meetingUrl?: string | null;
}) => {
  const router = useRouter();

  // get enrollment id

  const handleStart = () => {
    const programType = programDetails?.type;
    const programId = programDetails.id;
    switch (programType) {
      case "interview":
        return router.push(
          `/u/program/${programId}/interview?enrollmentId=${enrollmentId}`,
        );
      case "video_based_interview":
        return router.push(
          `/u/program/${programId}/vbi?enrollmentId=${enrollmentId}`,
        );
      case "video_call_interview":
        // return router.push(
        //   `/u/program/${programId}/vci?enrollmentId=${enrollmentId}`,
        // );
        if (!meetingUrl) {
          return toast.error("Not available yet");
        }
        return window.open(meetingUrl, "_blank");

      // case "psycometric":
      //   return alert("Psychometric not available yet");
      // return router.push(`/u/program/${programId}/psychometric`);
      default:
        alert("Invalid program type");
        break;
    }
  };
  return (
    <>
      <HiButton
        // variant="secondary"
        className="w-full max-w-36"
        onClick={handleStart}
      >
        Start
      </HiButton>
    </>
  );
};

export default StartProgram;
