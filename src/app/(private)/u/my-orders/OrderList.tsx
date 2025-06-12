"use client";
import { api } from "@/trpc/react";
import { HiDataTable } from "@hidstech/common_components";
import { type ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { type GetOrderByUser } from "@/types";
import Badge from "@/components/ui/Badge";

const OrderList = () => {
  const { data, isLoading } = api.order.getByUserId.useQuery({
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    userId: "me",
  });

  const router = useRouter();

  const column: ColumnDef<GetOrderByUser[number]>[] = [
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
      accessorKey: "payment",
      header: "Payment Id",
      cell: ({ row }) => <div>{row.original.paymentId}</div>,
    },
    {
      accessorKey: "payment method",
      header: "Payment Method",
      cell: ({ row }) => <div>{row.original.paymentMethod}</div>,
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
        <div className="text-center">
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

    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     return (
    //       <HiButton
    //         onClick={() => {
    //           router.push(`/u/program/${row.original.programId}`);
    //         }}
    //       >
    //         Start
    //       </HiButton>
    //     );
    //   },
    // },
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
