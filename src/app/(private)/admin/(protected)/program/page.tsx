import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import ProgramTable from "./ProgramTable";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  await api.program.getAll.prefetch();
  return (
    <HydrateClient>
      <div className='container'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className="section_heading">Program List</h2>
        </div>
        <ProgramTable />
      </div>
    </HydrateClient>
  );
};
export default page;
