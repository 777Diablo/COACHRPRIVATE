"use client";

import React, { useState } from "react";
import {
  HiBadge,
  HiButton,
  HiDataTable,
  HiInput,
  HiModal,
  useDebounce,
} from "@hidstech/common_components";
import { type Program } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { api } from "@/trpc/react";
import useTableState from "@/hooks/useTableState";
import EditForm from "./EditForm";
import { Pencil } from "lucide-react";
import { snakeToNormal } from "@/utils";
import Badge from "@/components/ui/Badge";

const ProgramTable = () => {
  // const {} = useQueryContext
  const [state, setState] = React.useState("");
  const { tableState, setPagination } = useTableState({});

  const debouncedValue = useDebounce(state, 500);

  const [openModal, setOpenModal] = useState(false);
  const [editableData, setEditableData] = useState<Program | undefined>();

  const { data, isLoading } = api.program.getAll.useQuery();

  const handleEdit = (data: Program) => {
    setEditableData(data);
    handleOpenModal();
  };

  // const handleDelete = (data: Program) => {
  //   setEditableData(data);
  //   handleOpenModal();
  // };

  const column: ColumnDef<Program>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "code", header: "Code" },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize"> {snakeToNormal(row.original.type)}</div>
      ),
    },
    {
      accessorKey: "includePsycometric",
      header: "Psycometric",
      cell: ({ row }) => (
        <Badge
          variant={row.original.includePsycometric ? "success" : "destructive"}
        >
          {row.original.includePsycometric ? "Included" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.original.status}</div>,
    },
    { accessorKey: "totalPrice", header: "Total Price" },
    { accessorKey: "discount", header: "Discount" },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          <HiButton
            onClick={() => handleEdit(row.original)}
            icon={Pencil}
            variant="outline"
          />
        </div>
      ),
    },
  ];

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
        <HiButton onClick={handleOpenModal}>Add Program</HiButton>
      </div>

      <HiDataTable
        data={data?.programs ?? []}
        columns={column}
        // totalCount={data?.totalCount}
        // pagination={tableState.pagination}
        // setPagination={setPagination}
        isLoading={isLoading}
      />

      <HiModal
        title={`${editableData ? "Edit" : "Create New"} Program`}
        open={openModal}
        onClose={closeModal}
        isScrollable
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

export default ProgramTable;
