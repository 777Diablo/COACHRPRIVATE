import { api, HydrateClient } from "@/trpc/server";
import React from "react";
import OrderList from "./OrderList";

const page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  //   await api.order.getAll.prefetch();
  return (
    <HydrateClient>
      <div className='container'>
        <div className='mb-2 flex items-center justify-between'>
          <h2 className="section_heading">Orders</h2>
        </div>
        <OrderList />
      </div>
    </HydrateClient>
  );
};
export default page;
