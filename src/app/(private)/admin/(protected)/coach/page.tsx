import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import CoachTable from "./CoachTable";
import { HiSectionHeading } from "@hidstech/common_components";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  await api.user.getUsersByRole.prefetch({
    roles: ["coach"],
    search: "",
    searchBy: "name",
    page: 0,
    limit: 10,
  });
  return (
    <HydrateClient>
      <div className='container'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className="section_heading">Coach List</h2>
        </div>
        <CoachTable />
      </div>
    </HydrateClient>
  );
};
export default page;
