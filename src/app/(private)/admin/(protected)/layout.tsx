import { ADMIN_MENU } from "@/components/menus";
import SideMenu from "@/components/SideMenu";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-full">
      <div className="z-80 top-0 hidden w-[280px] flex-col space-y-4 bg-background text-foreground md:flex shadow-sm">
      <SideMenu menus={ADMIN_MENU} />
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default layout;
