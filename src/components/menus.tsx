"use client";
import {
  LayoutDashboard,
  LayoutDashboardIcon,
  PersonStanding,
  Users,
  BookMarked,
  BookmarkCheck,
  type LucideIcon,
  Users2,
  User,
  ListOrdered,
  ListCheck,
  ListChecks,
  MessageCircleQuestion,
  UserPen,
  CalendarDays
} from "lucide-react";

export interface IRoute {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
  color?: string;
  submenu?: IRoute[];
  routes?: IRoute[];
}

export const USER_MENU: IRoute[] = [
  {
    id: "dashboard",
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    href: "/u",
    color: "text-blue-500",
  },
  {
    id: "my-programs",
    icon: LayoutDashboardIcon,
    label: "My Programs",
    href: "/u/program",
    color: "text-blue-500",
  },
  {
    id: "my-orders",
    label: "Order History",
    icon: BookMarked,
    href: "/u/my-orders",
    color: "text-orange-500",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/u/profile",
    color: "text-green-500",
  },
];

export const ADMIN_MENU: IRoute[] = [
  {
    id: "dashboard",
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    href: "/admin/dashboard",
    color: "text-blue-500",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/admin/user",
    color: "text-green-500",
  },
  {
    id: "enquiry",
    label: "Enquiry",
    icon: BookmarkCheck,
    href: "/admin/enquiry",
    color: "text-orange-500",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ListOrdered,
    href: "/admin/orders",
    color: "text-orange-500",
  },
  {
    id: "program-enrollment",
    label: "Program Enrollment",
    icon: ListCheck,
    href: "/admin/program-enrollment",
    color: "text-green-500",
  },

  {
    id: "program",
    label: "Programs",
    icon: ListChecks,
    href: "/admin/program",
    color: "text-orange-500",
  },
  {
    id: "coach",
    icon: Users2,
    label: "Coach",
    href: "/admin/coach",
  },
  {
    id: "members",
    icon: Users,
    label: "Members",
    href: "/admin/member",
  },
  {
    id: "questions",
    icon: MessageCircleQuestion,
    label: "Questions",
    href: "/admin/questions",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/admin/profile",
    color: "text-green-500",
  },
];

export const COACH_MENU: IRoute[] = [
  {
    id: "dashboard",
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    href: "/coach/dashboard",
    color: "text-blue-500",
  },
  {
    id: "program-enrollment",
    label: "Program Enrollment",
    icon: BookMarked,
    href: "/coach/program-enrollment",
    color: "text-green-500",
  },
  {
    id: "program-enrolled",
    label: "Timeslots",
    icon: CalendarDays,
    href: "/coach/timeslots",
    color: "text-green-500",
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserPen,
    href: "/coach/profile",
    color: "text-green-500",
  },
];
