"use client";

import { useState } from "react";
import {
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

// Define the combined state type
type TableState = {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
};

// Custom hook
const useTableState = ({
  sorting: defaultSorting = [],
  columnFilters: defaultColumnFilters = [],
  columnVisibility: defaultColumnVisibility = {},
  pagination: defaultPagination = {
    pageIndex: 0,
    pageSize: 10,
  },
  rowSelection: defaultRowSelection = {},
}: {
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  columnVisibility?: VisibilityState;
  pagination?: PaginationState;
  rowSelection?: RowSelectionState;
}) => {
  // State hooks for each individual state
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(defaultColumnFilters);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility,
  );
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(defaultRowSelection);

  // Combine the states into a single object
  const tableState: TableState = {
    sorting,
    columnFilters,
    columnVisibility,
    pagination,
    rowSelection,
  };

  // Reset function to reset all states to their default values
  const resetTableState = () => {
    setSorting(defaultSorting);
    setColumnFilters(defaultColumnFilters);
    setColumnVisibility(defaultColumnVisibility);
    setPagination(defaultPagination);
    setRowSelection(defaultRowSelection);
  };

  // Return the states and the reset function
  return {
    tableState,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setPagination,
    resetTableState,
    setRowSelection,
  };
};

export default useTableState;
