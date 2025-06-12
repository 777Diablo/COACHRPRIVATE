import { USER_MENU } from "@/components/menus";
import SideMenu from "@/components/SideMenu";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return redirect("/signin");
  }
  if (session.user?.role === "admin") return redirect("/admin");
  if (session.user?.role === "coach") return redirect("/coach");
  if (session.user?.role != "user") return redirect("/");

  return (
    <div className="relative flex h-full">
      <div className="z-80 top-0 hidden w-[280px] flex-col space-y-4 bg-background text-foreground shadow-sm md:flex">
        <SideMenu menus={USER_MENU} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
