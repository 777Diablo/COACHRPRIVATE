import { api } from "@/trpc/react";

export const useProgramDetails = (programId: string | null) => {
  return api.program.getOne.useQuery(
    { id: programId! },
    { enabled: !!programId } // Only fetch if programId exists
  );
};


