"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

export default function ProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const { data, isLoading, isError } = api.program.getAllPublic.useQuery();
  const programs = data?.programs ?? [];

  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

  
    checkIfMobile();

    
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleNavigation = (programId: string) => {
    router.push(`/details?program=${programId}`);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      {/* Button/header for desktop and mobile */}
      <div
        className={cn(!isMobile && "relative hover:cursor-pointer")}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        <button
          className="flex items-center gap-1 py-2 text-base text-foreground/80 transition-colors hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
          aria-expanded={isOpen}
          onClick={isMobile ? toggleDropdown : undefined}
        >
          Services
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180 transform",
            )}
          />
        </button>

        {/* Desktop dropdown (absolute positioned) */}
        {!isMobile && isOpen && (
          <div className="absolute left-0 top-10 z-50 mt-4 w-[500px] rounded-lg border border-border bg-background py-2 shadow-lg">
            {isLoading && (
              <div className="px-4 py-2 text-muted-foreground">
                Loading programs...
              </div>
            )}

            {isError && (
              <div className="px-4 py-2 text-red-500">
                Error loading programs
              </div>
            )}

            {!isLoading && !isError && programs.length === 0 && (
              <div className="px-4 py-2 text-muted-foreground">
                No programs available
              </div>
            )}

            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => handleNavigation(program.id)}
                className="group flex w-full cursor-pointer items-center px-4 py-2 text-left transition-colors hover:bg-accent/10"
              >
                <div>
                  <p className="font-medium text-primary">{program.name}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {program.description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile dropdown  */}
      {isMobile && isOpen && (
        <div className="ml-4 flex flex-col">
          {isLoading ? (
            <div className="py-2 text-muted-foreground">Loading...</div>
          ) : isError ? (
            <div className="py-2 text-red-500">Error loading services</div>
          ) : programs.length === 0 ? (
            <div className="py-2 text-muted-foreground">
              No services available
            </div>
          ) : (
            programs.map((program) => (
              <a
                key={program.id}
                onClick={() => handleNavigation(program.id)}
                className="cursor-pointer py-2 text-primary"
              >
                {program.name}
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
