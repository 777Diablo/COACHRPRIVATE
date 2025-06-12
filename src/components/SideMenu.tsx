"use client";
import React from "react";
import { type IRoute } from "./menus";
import {
  cn,
  hiButtonVariants,
  HiScrollArea,
} from "@hidstech/common_components";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@hidstech/common_components";
import { usePathname } from "next/navigation";

const classname =
  "text-pink-700 text-teal-500 hidden text-pink-500 text-rose-700 text-yellow-400 text-yellow-600 text-indigo-500 text-violet-700 text-blue-500 text-cyan-500 text-cyan-700 text-rose-700 text-teal-600 text-cyan-300 text-fuchsia-700 text-fuchsia-500 text-red-700 text-red-500 text-pink-500 text-violet-700 text-rose-500  text-green-700 text-yellow-700 text-teal-700 text-orange-700 text-amber-700 text-indigo-700 text-blue-700 text-purple-700 text-purple-500 text-sky-500 text-yellow-500 text-yellow-300 text-green-500 text-cyan-500 text-cyan-700 text-sky-700  text-lime-500 text-orange-500 text-rose-500 text-violet-500 text-purple-500 text-red-700";

// const routes: IRoute[] = PAGES; //filteredRoutes;
const MenuItem = ({
  route,
  pathname,
  isChild,
}: {
  route: IRoute;
  pathname: string;
  isChild?: boolean;
}) => {
  return (
    <Link
      key={route.href}
      href={route.href}
      className={cn(
        "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-black/10 hover:text-black dark:text-zinc-300/90 dark:hover:bg-white/10 dark:hover:text-white",
        pathname === route.href
          ? "bg-black/10 text-black dark:bg-white/10 dark:text-white"
          : "text-zinc-600/90",
        isChild ? "ml-6" : "",
      )}
    >
      <div className="flex flex-1 items-center">
        {route.icon && (
          <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
        )}
        {route.label}
      </div>
    </Link>
  );
};

export const Menu = ({
  menu,
  pathname,
  handleClose,
}: {
  menu: IRoute;
  pathname: string;
  handleClose?: () => void;
}) => {
  return menu.routes ? (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={menu.label} className="border-b-0 pb-0">
        <AccordionTrigger
          className={hiButtonVariants({
            size: "sm",
            variant: "ghost",
            className:
              "justify-between text-zinc-600/90 hover:bg-black/10 hover:text-black hover:no-underline dark:text-zinc-300/90 dark:hover:bg-white/10 dark:hover:text-white",
          })}
        >
          <span className="flex items-center justify-center">
            {menu.icon && (
              <menu.icon className={cn("mr-3 h-5 w-5", menu.color)} />
            )}
            {menu.label}
          </span>
        </AccordionTrigger>
        <AccordionContent className="">
          {/* <HiButton type="submit"> */}
          {menu.routes?.map(
            (subItem, subIndex) => (
              // <SheetClose asChild key={subIndex}>
              <div key={`${subIndex}`} onClick={handleClose}>
                <MenuItem route={subItem} pathname={pathname} isChild />
              </div>
            ),

            // </SheetClose>
          )}
          {/* </HiButton> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <div onClick={handleClose}>
      <MenuItem route={menu} pathname={pathname} />
    </div>
  );
};

const SideMenu = ({
  menus,
  handleClose,
}: {
  menus: IRoute[];
  handleClose?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="w-full p-2">
      <HiScrollArea className="h-[90vh]">
        <div className="space-y-1">
          {menus.map((menu, i) => (
            <Menu
              key={i}
              menu={menu}
              pathname={pathname}
              handleClose={handleClose}
            />
          ))}
          <div className={`${classname} hidden`} />
        </div>
      </HiScrollArea>
    </div>
  );
};

export default SideMenu;
