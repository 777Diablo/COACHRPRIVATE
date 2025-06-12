import { type ROLE } from "@prisma/client";

export const VALID_ROLE: Record<string, ROLE> = {
  admin: "admin",
  user: "user",
  coach: "coach",
} as const;

// Function to validate Prisma enum
export function isValidRole(role: unknown): role is ROLE {
  return (
    typeof role === "string" && Object.values(VALID_ROLE).includes(role as ROLE)
  );
}
