import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import QuestionList from "./QuestionList";

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
          <h2 className="section_heading">Questions</h2>
        </div>
        <QuestionList />
      </div>
    </HydrateClient>
  );
};
export default page;
