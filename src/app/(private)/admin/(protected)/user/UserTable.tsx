"use client";

import React from "react";
import { HiDataTable, HiInput, useDebounce } from "@hidstech/common_components";
import { type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { api } from "@/trpc/react";
import useTableState from "@/hooks/useTableState";

export const UserTable = () => {
  // const {} = useQueryContext
  const [state, setState] = React.useState("");

  const debouncedValue = useDebounce(state, 500);

  const { tableState, setPagination } = useTableState({});

  const { data, isFetching } = api.user.getUsersByRole.useQuery({
    roles: ["user"],
    search: debouncedValue,
    searchBy: "name",
    limit: tableState.pagination.pageSize,
    page: tableState.pagination.pageIndex,
  });

  const column: ColumnDef<User>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "mobile", header: "Mobile" },
  ];

  return (
    <>
      <div className="mb-4 max-w-sm">
        <HiInput
          name="state"
          // label="Email"
          placeholder="Search by name"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      <HiDataTable
        data={data?.users ?? []}
        columns={column}
        totalCount={data?.totalCount}
        pagination={tableState.pagination}
        setPagination={setPagination}
        isLoading={isFetching}
      />
      <div></div>
    </>
  );
};
