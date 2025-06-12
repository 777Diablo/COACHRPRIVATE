"use client";

import React, { useState } from "react";
import {
  HiButton,
  HiDataTable,
  HiInput,
  HiModal,
  useDebounce,
} from "@hidstech/common_components";
import { type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { api } from "@/trpc/react";
import useTableState from "@/hooks/useTableState";
import EditForm from "./EditForm";
import { PencilIcon } from "lucide-react";

const CoachTable = () => {
  // const {} = useQueryContext
  const [state, setState] = React.useState("");
  const { tableState, setPagination } = useTableState({});

  const debouncedValue = useDebounce(state, 500);

  const [openModal, setOpenModal] = useState(false);
  const [editableData, setEditableData] = useState<User | undefined>();

  const { data, isLoading } = api.user.getUsersByRole.useQuery({
    roles: ["coach"],
    search: debouncedValue,
    searchBy: "name",
    limit: tableState.pagination.pageSize,
    page: tableState.pagination.pageIndex,
  });

  const column: ColumnDef<User>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "mobile", header: "Mobile" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <HiButton
              onClick={() => handleEdit(row.original)}
              icon={PencilIcon}
              variant="outline"
            />
          </div>
        );
      },
    },
  ];

  const handleEdit = (data: User) => {
    setEditableData(data);
    handleOpenModal();
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditableData(undefined);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="mb-4 w-full max-w-sm">
          <HiInput
            name="state"
            // label="Email"
            placeholder="Search by name"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <HiButton onClick={handleOpenModal}>Add Coach</HiButton>
      </div>

      <HiDataTable
        data={data?.users ?? []}
        columns={column}
        totalCount={data?.totalCount}
        pagination={tableState.pagination}
        setPagination={setPagination}
        isLoading={isLoading}
      />

      <HiModal
        title={`${editableData ? "Edit" : "Create New"} Coach`}
        open={openModal}
        onClose={closeModal}
      >
        <EditForm
          type={editableData ? "edit" : "add"}
          data={editableData}
          closeModal={closeModal}
        />
      </HiModal>
      <div></div>
    </>
  );
};

export default CoachTable;
