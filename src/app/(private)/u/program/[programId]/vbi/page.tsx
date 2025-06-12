"use client";

import React, { Suspense } from "react";
// import Interview from "./Interview";
import dynamic from "next/dynamic";
import { HiPageLoader } from "@hidstech/common_components";
import { api } from "@/trpc/react";

const PreTestCheck = dynamic(() => import("./PreTestCheck"), {
  ssr: false, // Disable SSR for this component
});
const Interview = dynamic(() => import("./Interview"), {
  ssr: false, // Disable SSR for this component
});

const Page = ({
  params,
  searchParams,
}: {
  params: { programId: string };
  searchParams: { enrollmentId: string };
}) => {
  const [isTestStarted, setTestStarted] = React.useState<boolean>(false);

  // get enrollment details
  const enrollmentId = searchParams.enrollmentId;

  const enrollmentDetails = api.programEnrollment.getOne.useQuery(
    { id: enrollmentId },
    { enabled: !!enrollmentId },
  );

  const handleStartTest = () => {
    setTestStarted(true);
  };

  // if not enrollmentId, show error page
  if (!searchParams.enrollmentId) {
    return (
      <div>
        <p>Enrollment not found</p>
      </div>
    );
  }
  if (enrollmentDetails.isLoading) {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  }

  if (enrollmentDetails.isError || !enrollmentDetails.data) {
    return (
      <div>
        <p>Failed to load enrollment data</p>
        <p>
          <pre>{JSON.stringify(enrollmentDetails.error, null, 2)}</pre>
        </p>
      </div>
    );
  }

  return (
    <div>
      {isTestStarted ? (
        <div>
          <Suspense fallback={<HiPageLoader />}>
            <Interview
              programId={params.programId}
              enrollmentId={enrollmentId}
            />
          </Suspense>
        </div>
      ) : (
        <PreTestCheck onStartTest={handleStartTest} />
      )}
    </div>
  );
};

export default Page;
