"use client"; // Error components must be Client Components

import { HiErrorUI } from "@hidstech/common_components";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.name, error.message, error.digest);
  }, [error]);

  return (
    <div className="container grid h-screen place-items-center">
      <div className="w-full">
        <h2>
          {error.message === "UNAUTHORIZED" ? (
            <HiErrorUI errorMessage={error.message} status="401" />
          ) : (
            <HiErrorUI errorMessage={"Something went wrong"} status="500" />
          )}
        </h2>
        {/* // Attempt to recover by trying to re-render the segment */}
        {/* <button onClick={() => reset()}>Try again</button> */}
      </div>
    </div>
  );
}
