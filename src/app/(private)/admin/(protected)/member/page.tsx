import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import Member from "./MemberTable";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  await api.user.getAllStaff.prefetch({
    search: "",
    searchBy: "name",
    page: 0,
    limit: 10,
  });
  return (
    <HydrateClient>
      <div className='container'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className="section_heading">Member List</h2>
        </div>
        <Member />
      </div>
    </HydrateClient>
  );
};
export default page;
