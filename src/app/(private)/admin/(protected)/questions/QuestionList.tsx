"use client";

import React, { useState } from "react";
import {
  HiButton,
  HiDataTable,
  HiInput,
  HiModal,
  useDebounce,
} from "@hidstech/common_components";
import { type Question } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { api } from "@/trpc/react";
import useTableState from "@/hooks/useTableState";
import QuestionForm from "./QuestionForm";
import { ActionIcon } from "@/components/ActionIcon";
import Swal from "sweetalert2";
import { swalClass } from "@/lib/utils";
import toast from "react-hot-toast";

const QuestionList = () => {
  const utils = api.useUtils();
  const [state, setState] = React.useState("");
  const { tableState, setPagination } = useTableState({});
  const debouncedValue = useDebounce(state, 500);
  const [openModal, setOpenModal] = useState(false);
  const [editableData, setEditableData] = useState<Question | undefined>();

  const { data, isLoading } = api.question.getAll.useQuery();
  const deleteMutation = api.question.delete.useMutation({
    onSuccess: async () => {
      await utils.question.getAll.invalidate();
      toast.success("Slot deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message ?? "Slot deletion failed");
    },
  });

  const handleEdit = (data: Question) => {
    setEditableData(data);
    handleOpenModal();
  };

  const handleDelete = async (id: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: swalClass,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        deleteMutation.mutate({ id });
      }
    });
  };

  const column: ColumnDef<Question>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "duration", header: "Duration in seconds" },
    { accessorKey: "tags", header: "Tags" },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ActionIcon
            name="edit"
            tooltip="Edit"
            onClick={() => handleEdit(row.original)}
          />
          <ActionIcon
            name="delete"
            tooltip="Delete"
            onClick={() => handleDelete(row.original.id)}
          />
        </div>
        // <div>
        //   <HiButton
        //     onClick={() => handleEdit(row.original)}
        //     icon={Pencil}
        //     variant="outline"
        //   />
        //   <HiButton
        //     onClick={() => handleDelete(row.original)}
        //     icon={Trash}
        //     variant="outline"
        //   />
        // </div>
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
            placeholder="Search by name"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <HiButton onClick={handleOpenModal}>Add Question</HiButton>
      </div>

      <HiDataTable
        data={data?.questions ?? []}
        columns={column}
        // totalCount={data?.totalCount}
        // pagination={tableState.pagination}
        // setPagination={setPagination}
        isLoading={isLoading}
      />

      <HiModal
        title={`${editableData ? "Edit" : "Create New"} Question`}
        open={openModal}
        onClose={closeModal}
        isScrollable
      >
        <QuestionForm
          type={editableData ? "edit" : "add"}
          data={editableData}
          closeModal={closeModal}
        />
      </HiModal>
      <div></div>
    </>
  );
};

export default QuestionList;
