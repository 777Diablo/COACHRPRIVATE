"use client";
import { HiAvatar } from "@hidstech/common_components";
import { useSession } from "next-auth/react";

import React from "react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="flex h-full w-full items-center justify-between px-4">
      <div></div>
      <div>
        <HiAvatar
          user={{
            name: data?.user?.name ?? "",
            image: data?.user.image ?? "https://i.pravatar.cc/300",
            // image: data?.user?.image,
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
