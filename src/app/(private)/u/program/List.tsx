"use client";
import { api } from "@/trpc/react";
import { type GetProgramEnrollmentByUser } from "@/types";
import { HiButton, HiDataTable } from "@hidstech/common_components";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import ChooseTimeslot from "./ChooseTimeslotModal";
import Badge from "@/components/ui/Badge";

const List = () => {
  const { data, isLoading } = api.programEnrollment.getByUserId.useQuery({
    id: "me",
  });

  const router = useRouter();

  const column: ColumnDef<GetProgramEnrollmentByUser[number]>[] = [
    {
      accessorKey: "slno",
    },
    {
      accessorKey: "program",
      header: "Program",
      cell: ({ row }) => <div>{row.original.program.name}</div>,
    },
    {
      accessorKey: "scheduledAt",
      header: "Scheduled At",
      cell: ({ row }) => (
        <div>
          {row.original.type == "video_call_interview" ? (
            row.original.scheduledAt ? (
              format(row.original.scheduledAt, "dd MMM,yyyy hh:mm a")
            ) : row.original.includePsycometric ? (
              "-"
            ) : (
              <ChooseTimeslot
                enrollmentId={row.original.id}
                includePsycometric={row.original.includePsycometric}
                coachId={row.original.assignedCoach}
              />
            )
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div>
          <Badge
            variant={
              row.original.status === "COMPLETED"
                ? "success"
                : row.original.status === "PENDING"
                  ? "destructive"
                  : "warning"
            }
          >
            {row.original.status}
          </Badge>
        </div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <HiButton
          onClick={() => {
            router.push(
              `/u/program/${row.original.programId}?enrollmentId=${row.original.id}`,
            );
          }}
          title="View"
        />
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

export default List;
