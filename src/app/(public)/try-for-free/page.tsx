// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import RegistrationForm from "../components/navigation/form/Registration-form";
// import SuccessMessage from "../components/navigation/form/Successmessage";
// import EmailVerification from "../components/navigation/form/EmailVerification";

// export default function TryForFreePage() {
//   const [step, setStep] = useState<"form" | "success" | "verification">("form");
//   const [userDetails, setUserDetails] = useState<{
//     email: string;
//     password: string;
//   } | null>(null);
//   const router = useRouter();

//   const handleFormSubmit = async (data: { email: string }) => {
//     // Simulate API call
//     const generatedPassword = `${data.email.split("@")[0]}${Math.floor(Math.random() * 1000)}`;
//     setUserDetails({
//       email: data.email,
//       password: generatedPassword,
//     });
//     setStep("success");
//   };

//   const handleGetStarted = () => {
//     setStep("verification");
//   };

//   const handleVerificationComplete = () => {
//     router.push("/login");
//   };

//   return (
//     <main className="min-h-screen bg-background pt-20">
//       <div className="container mx-auto px-4 py-8">
//         {step === "form" && <RegistrationForm onSubmit={handleFormSubmit} />}

//         {step === "success" && userDetails && (
//           <SuccessMessage
//             email={userDetails.email}
//             password={userDetails.password}
//             onGetStarted={handleGetStarted}
//           />
//         )}

//         {step === "verification" && (
//           <EmailVerification
//             onVerificationComplete={handleVerificationComplete}
//           />
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { redirect, useRouter } from "next/navigation";
import RegistrationForm from "../components/navigation/form/Registration-form";

export default function TryForFreePage() {
  const router = useRouter();

  const handleFormSubmit = async (data: any) => {
    try {
      console.log("Simulating API call with data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Simulated data saved successfully!");

      router.push("/signup");
    } catch (error) {
      console.error("Simulated form submission error:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return redirect("/signup");

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <RegistrationForm onSubmit={handleFormSubmit} />
      </div>
    </main>
  );
}
