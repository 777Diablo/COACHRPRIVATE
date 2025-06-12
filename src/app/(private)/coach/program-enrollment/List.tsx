"use client";

import { api } from "@/trpc/react";
import { type GetProgramEnrollmentByAssignedCoach } from "@/types";
import { HiButton, HiDataTable } from "@hidstech/common_components";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useState } from "react";
import Link from "next/link";

const List = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editableData, setEditableData] = useState<any>(null);

  const { data, isLoading } = api.programEnrollment.getByAssignedCoach.useQuery(
    { id: "me" },
  );

  const column: ColumnDef<GetProgramEnrollmentByAssignedCoach[number]>[] = [
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
          {/* {row.original?.recordingUrl ? (
            <ActionIcon
              name="view"
              tooltip="View"
              onClick={() => viewInterview(row.original)}
            />
          ) : null} */}
          <Link href={`/coach/program-enrollment/${row.original.id}`}>
            <HiButton title="View" />
          </Link>
        </div>
      ),
    },
  ];

  const viewInterview = (data: any) => {
    setEditableData(data);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditableData(null);
  };

  // console.log('editableData======>', editableData)

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

      {/* <HiModal
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        title={`${editableData?.user?.name}`}
        open={openModal}
        onClose={closeModal}
      >
        <ViewInterviewForm
          type={editableData ? "edit" : "add"}
          data={editableData}
          closeModal={closeModal}
        />
      </HiModal> */}
    </>
  );
};

export default List;
