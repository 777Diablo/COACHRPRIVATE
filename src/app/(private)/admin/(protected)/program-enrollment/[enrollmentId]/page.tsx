import { api } from "@/trpc/server";
import React from "react";
import { ProgramDetails } from "./program-details";

const page = async ({ params }: { params: { enrollmentId: string } }) => {
  const enrollmentId = params.enrollmentId;

  const enrollmentDetails = await api.programEnrollment.getOne({
    id: enrollmentId,
  });

  if (!enrollmentId)
    return (
      <div>
        <p>Enrollment not found</p>
      </div>
    );

  return (
    <div>
      {enrollmentDetails ? (
        <ProgramDetails enrollmentId={enrollmentId} />
      ) : null}
    </div>
  );
};

export default page;
