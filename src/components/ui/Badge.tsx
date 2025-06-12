import { cn } from "@hidstech/common_components";
import React from "react";

const colorMap: Record<
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "neutral",
  string
> = {
  primary:
    "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-600 dark:text-blue-100 dark:border-blue-600",
  secondary:
    "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700",
  destructive:
    "bg-red-100 text-red-700 border-red-300 dark:bg-red-600 dark:text-red-100 dark:border-red-600",
  success:
    "bg-green-100 text-green-700 border-green-300 dark:bg-green-600 dark:text-green-100 dark:border-green-600",
  warning:
    "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-600 dark:text-yellow-100 dark:border-yellow-600",
  info: "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-600 dark:text-teal-100 dark:border-teal-600",
  neutral:
    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
};

const Badge = ({
  className,
  children,
  variant = "primary",
}: {
  className?: string;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "success"
    | "warning"
    | "info"
    | "neutral";
}) => {
  return (
    <div
      className={cn(
        "w-fit rounded-sm border px-3 py-1 text-xs font-medium tracking-wide shadow-sm",
        "transition-colors duration-200 ease-in-out", // Smooth hover effect
        colorMap[variant],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
