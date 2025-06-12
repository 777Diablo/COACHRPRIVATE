import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import EnquiryTable from "./EnquiryTable";

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
          <h2 className="section_heading">Enquiries</h2>
        </div>
        <EnquiryTable />
      </div>
    </HydrateClient>
  );
};
export default page;
