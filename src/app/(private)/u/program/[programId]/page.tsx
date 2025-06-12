import { api } from "@/trpc/server";
import React from "react";
import { ProgramDetails } from "./_components/program-details";

const page = async ({
  params,
  searchParams,
}: {
  params: { programId: string };
  searchParams: { enrollmentId: string } | undefined;
}) => {
  const programDetails = await api.program.getOne({
    id: params.programId,
  });

  const enrollmentId = searchParams?.enrollmentId;

  if (!enrollmentId)
    return (
      <div>
        <p>Enrollment not found</p>
      </div>
    );

  return (
    <div>
      {programDetails ? (
        <ProgramDetails programDetails={programDetails} />
      ) : null}
    </div>
  );
};

export default page;
