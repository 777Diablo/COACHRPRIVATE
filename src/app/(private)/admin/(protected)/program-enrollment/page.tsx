import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import List from "./List";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  await api.programEnrollment.getAll.prefetch();
  return (
    <HydrateClient>
      <div className='container'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className="section_heading">Program Enrollments</h2>
        </div>
        <List />
      </div>
    </HydrateClient>
  );
};
export default page;
