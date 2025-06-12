import { api } from "@/trpc/react";
import { HiDropdown, type HiDropdownProps } from "@hidstech/common_components";
import React from "react";

const ProgramInput = (props: HiDropdownProps) => {
  const { data, ...programResults } = api.program.getAllPublic.useQuery();

  const programOptions =
    data?.programs?.map((item) => ({ label: item.name, value: item.id })) ?? [];

  return (
    <HiDropdown
      name="program"
      label="Program"
      options={programOptions}
      isLoading={programResults.isLoading}
      {...props}
    />
  );
};

export default ProgramInput;
