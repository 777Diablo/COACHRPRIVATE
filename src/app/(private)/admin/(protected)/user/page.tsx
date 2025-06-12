import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import { UserTable } from "./UserTable";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  await api.user.getUsersByRole.prefetch({
    roles: ["user"],
    search: "",
    searchBy: "name",
    page: 0,
    limit: 10,
  });

  return (
    <HydrateClient>
      <div className='container'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className="section_heading">Users</h2>
        </div>
        <UserTable />
      </div>
    </HydrateClient>
  );
};
export default page;