"use client";
import { api } from "@/trpc/react";
import { type GetAllProgramEnrollment } from "@/types";
import {
  type DropdownOptionTypes,
  HiButton,
  HiDataTable,
} from "@hidstech/common_components";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React from "react";
import { AssignCoachAction } from "./actions";
import ProgramInput from "@/components/ProgramInput";
import { useRouter } from "next/navigation";

const List = () => {
  const [filter, setFilter] = React.useState<{
    program: DropdownOptionTypes[];
  }>({
    program: [],
  });

  const { data, isLoading } = api.programEnrollment.getAll.useQuery({
    program: filter.program.map((item) => item.value as string),
  });

  const router = useRouter();

  const column: ColumnDef<GetAllProgramEnrollment["list"][number]>[] = [
    {
      accessorKey: "slno",
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
      accessorKey: "program",
      header: "Program",
      cell: ({ row }) => <div>{row.original.program.name}</div>,
    },
    {
      accessorKey: "coach",
      header: "Coach",
      cell: ({ row }) => (
        <div>
          <div>{row.original?.coach?.name}</div>
          <div className="text-xs">{row.original?.coach?.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "User Enrollment Date",
      cell: ({ row }) => (
        <div>{format(row.original.createdAt, "dd MMM yyyy - hh:mm aa")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.original.status}</div>,
    },
    {
      id: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <AssignCoachAction enrollmentId={row.original.id} />
          <HiButton
            onClick={() => {
              router.push(`/admin/program-enrollment/${row.original.id}`);
            }}
            title="View"
          />
        </div>
      ),
    },
  ];

  const handleProgramChange = (e: DropdownOptionTypes[]): void => {
    setFilter((prev) => ({
      ...filter,
      program: e,
    }));
  };

  return (
    <>
      {/* section for filter based on program */}
      <div className="section_card">
        {/* dropdown */}
        <ProgramInput
          value={filter.program}
          onChange={handleProgramChange}
          isMulti
        />
      </div>

      <HiDataTable
        data={data?.list ?? []}
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
