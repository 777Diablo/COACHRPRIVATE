"use client";

import { HiButton } from "@hidstech/common_components";
// import {  Avatar,  AvatarFallback,  AvatarImage,} from "@hidstech/common_components/components/ui/avatar.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@hidstech/common_components/components/ui/popover.js";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const UserMenu = ({ user }: { user: Session["user"] }) => {
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    toast.success("You are logged out");
    window.location.href = "/";
  };

  console.log(user?.role);

  return (
    <Popover>
      <PopoverTrigger>
        {/* <Avatar>
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar> */}
        <div className="overflow-clip rounded-full">
          {user?.image ? (
            <Image src={user.image} alt="" width={40} height={40} />
          ) : (
            <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary dark:bg-gray-600">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="pb-3">
          <div className="text-sm">{user?.name}</div>
          <div className="text-sm">{user?.email}</div>
        </div>

        

        {user?.role === "admin" && <Link href="/admin">Admin Dashboard</Link>}
        {user?.role === "user" && <Link href="/u">Dashboard</Link>}
        {user?.role === "coach" && <Link href="/coach">Dashboard</Link>}
        <div className="flex justify-end">
          <HiButton
            variant="outline"
            onClick={handleSignOut}
            isLoading={loading}
          >
            Logout
          </HiButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
