// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { type Program } from "@prisma/client";
// import { api } from "@/trpc/react";
// import { HiPageLoader, HiErrorUI } from "@hidstech/common_components";
// import { Button } from "@hidstech/common_components/components/ui/button.js";

// export default function DetailsPage() {
//   const searchParams = useSearchParams();
//   const programId = searchParams.get("program");
//   const [programDetails, setProgramDetails] = useState<Program | null>(null);

//   // Fetch program details
//   const { data, isLoading, error } = api.program.getOne.useQuery(
//     { id: programId! },
//     { enabled: !!programId }
//   );

//   const router = useRouter();

//   useEffect(() => {
//     if (data) {
//       setProgramDetails(data);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <HiPageLoader />;
//   }

//   if (!programId || error || !programDetails) {
//     return <HiErrorUI errorMessage="Program not found" status="404" />;
//   }

//   return (
//     <div className="container mx-auto py-12 mt-16">
//       <h1 className="text-3xl font-bold">{programDetails.name}</h1>
//       <Button
//   className="mt-8 bg-blue-600 text-white"
//   onClick={() => router.push(`/checkout?program=${programId}`)}
// >
//   Buy Now
// </Button>

//       <p className="mt-4">{programDetails.description}</p>
//       <p className="mt-4 font-semibold">
//         Price: &#x20B9;{programDetails.totalPrice}
//       </p>
//     </div>
//   );
// }

"use client";
import React, { Suspense } from "react";

import { HiPageLoader } from "@hidstech/common_components";
import DetailsPage from "./DetailsPage";

const page = () => {
  return (
    <Suspense fallback={<HiPageLoader />}>
      <DetailsPage />
    </Suspense>
  );
};

export default page;
