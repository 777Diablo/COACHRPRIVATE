"use client";
import { api } from "@/trpc/react";
import { type GetAllOrder } from "@/types";
import { HiDataTable } from "@hidstech/common_components";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React from "react";
// import PaymentApproval from "./PaymentApproval";
import Badge from "@/components/ui/Badge";

const OrderList = () => {
  const { data, isLoading } = api.order.getAll.useQuery();

  const column: ColumnDef<GetAllOrder[number]>[] = [
    {
      accessorKey: "slno",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>{format(row.original.createdAt, "dd MMM,yyyy")}</div>
      ),
    },
    {
      accessorKey: "program",
      header: "Program",
      cell: ({ row }) => (
        <div>{row.original.items.map((i) => i?.program?.name)}</div>
      ),
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <div>{row.original.user.name}</div>,
    },
    {
      accessorKey: "user_email",
      header: "User Email",
      cell: ({ row }) => <div>{row.original.user.email}</div>,
    },
    {
      accessorKey: "payment",
      header: "Payment Id",
      cell: ({ row }) => <div>{row.original?.paymentId}</div>,
    },
    {
      accessorKey: "payment",
      header: "Amount",
      cell: ({ row }) => <div>{row.original.totalPrice}</div>,
    },
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => (
        <div className="">
          <Badge
            className="capitalize"
            variant={
              row.original.paymentStatus === "SUCCESS"
                ? "success"
                : "destructive"
            }
          >
            {row.original.paymentStatus}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        // ! WE ARE NOW USING RAZOR PAY TO HANDLE PAYMENTS - SO NO LONGER NEEDED

        <>
          {/* {row.original.paymentStatus === "PENDING" && (
            <PaymentApproval orderId={row.original.id} />
          )}  */}
        </>
      ),
    },
  ];

  return (
    <>
      <HiDataTable
        data={data ?? []}
        columns={column}
        // totalCount={data?.totalCount}
        // pagination={tableState.pagination}
        // setPagination={setPagination}
        isLoading={isLoading}
      />
    </>
  );
};

export default OrderList;
