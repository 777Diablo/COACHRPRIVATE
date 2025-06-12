import { type Metadata } from "next";

import Header from "@/components/Header";
import PrivateHeader from "./_components/PrivateHeader";

export const metadata: Metadata = {
  title: "CoachR",
  description: "CoachR",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PrivateHeader />
      <main className="mt-[56px] w-full flex-1 overflow-auto border-l bg-gray-200 dark:border-slate-600 dark:bg-secondary">
        {children}
      </main>
    </>
  );
};
