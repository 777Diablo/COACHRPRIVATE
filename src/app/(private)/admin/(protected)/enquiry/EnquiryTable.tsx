"use client";

import React, { useState } from "react";
import {
  HiButton,
  HiDataTable,
  HiModal,
  useDebounce,
} from "@hidstech/common_components";
import { type Inquiry } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { api } from "@/trpc/react";
import useTableState from "@/hooks/useTableState";
import EditForm from "./EditForm";
import { Eye } from "lucide-react";

interface PopulatedInquiry extends Inquiry {
  program: {
    id: string;
    name: string;
    code: string;
  };
}

const EnquiryTable = () => {
  // const {} = useQueryContext
  const [state, setState] = React.useState("");
  const { tableState, setPagination } = useTableState({});

  const debouncedValue = useDebounce(state, 500);

  const [openModal, setOpenModal] = useState(false);
  const [editableData, setEditableData] = useState<Inquiry | undefined>();

  const { data, isLoading } = api.inquiry.getAll.useQuery();

  // const handleEdit = (data: Inquiry) => {
  //   setEditableData(data);
  //   handleOpenModal();
  // };

  const handleView = (data: Inquiry) => {
    setEditableData(data);
    handleOpenModal();
  };

  // const handleDelete = (data: Inquiry) => {
  //   setEditableData(data);
  //   handleOpenModal();
  // };

  const column: ColumnDef<PopulatedInquiry>[] = [
    { id: "slno", header: "Sl.No." },
    {
      accessorKey: "program.name",
      header: "Program",
      cell: ({ row }) => <div>{row.original.program.name}</div>,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "mobile", header: "Mobile" },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.original.status}</div>,
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div>
          {/* <HiButton
            onClick={() => handleEdit(row.original)}
            icon={Pencil}
            variant="outline"
          /> */}
          <HiButton
            onClick={() => handleView(row.original)}
            icon={Eye}
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
        {/* <div className="mb-4 w-full max-w-sm">
          <HiInput
            name="state"
            // label="Email"
            placeholder="Search by name"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div> */}
        {/* <HiButton onClick={handleOpenModal}>Add Inquiry</HiButton> */}
      </div>

      <HiDataTable
        data={data ?? []}
        columns={column}
        // totalCount={data?.totalCount}
        // pagination={tableState.pagination}
        // setPagination={setPagination}
        isLoading={isLoading}
      />

      <HiModal
        title={`${editableData ? "Edit" : "Create New"} Inquiry`}
        open={openModal}
        onClose={closeModal}
      >
        <EditForm type={"view"} data={editableData} closeModal={closeModal} />
      </HiModal>
      <div></div>
    </>
  );
};

export default EnquiryTable;
