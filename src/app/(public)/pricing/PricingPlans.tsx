import type React from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const PricingPlans: React.FC = () => {
  const { data, isLoading, isError } = api.program.getAllPublic.useQuery();
  const [expandedFeatureCards, setExpandedFeatureCards] = useState<
    Record<string, boolean>
  >({});
  const programs = data?.programs ?? [];
  console.log("fetched programs", programs);

  const toggleFeatures = (programId: string) => {
    setExpandedFeatureCards((prev) => ({
      ...prev,
      [programId]: !prev[programId],
    }));
  };

  if (isLoading) return <div className="text-center">Loading programs...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error loading programs</div>
    );

  return (
    <section id="pricing" className="bg-neutral-100 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="animate__animated animate__fadeInUp mb-4 text-4xl font-bold text-neutral-900 dark:text-gray-100">
            Choose Your Perfect Program
          </h2>
          <p className="animate__animated animate__fadeInUp animation-delay-200 mx-auto max-w-2xl text-lg text-neutral-600 dark:text-gray-300">
            Select from our carefully crafted programs designed to meet your
            unique needs and goals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`} group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 dark:bg-gray-700`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/id/${index + 1}/300/200`}
                  alt={`${program.name} image`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex h-16 items-start">
                  <h3 className="line-clamp-2 text-3xl font-bold text-neutral-900 dark:text-gray-100">
                    {program.name}
                  </h3>
                </div>

                <div className="mb-2 flex h-8 items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    &#x20B9; {program.totalPrice.toLocaleString() ?? "N/A"}
                  </span>
                  {/* <span className="ml-2 text-neutral-600">/month</span> */}
                </div>

                <div className="mb-6 mt-2 h-10">
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-neutral-600 dark:text-muted-foreground">
                    {program.description ?? "No description available."}
                  </p>
                </div>

                <div className="mb-6 flex flex-wrap justify-center gap-2 overflow-y-auto">
                  {program.highlights?.length > 0 ? (
                    program.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="dark:bg-gray/10 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-rose-700 dark:text-gray-300"
                      >
                        {highlight}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No highlights available.
                    </span>
                  )}
                </div>

                <div
                  className="mb-8 "
                  style={{
                    height: expandedFeatureCards[program.id] ? "auto" : "10rem",
                  }}
                >
                  <ul className="space-y-4">
                    {(program.features ?? [])
                      .slice(
                        0,
                        expandedFeatureCards[program.id]
                          ? (program.features ?? []).length
                          : 4,
                      )
                      .map((feature, featureIndex) => {
                        const featureItem = feature as { title: string };
                        return (
                          <li
                            key={featureIndex}
                            className="flex items-start text-neutral-700"
                          >
                            <svg
                              className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span className="line-clamp-2 dark:text-gray-300">
                              {featureItem.title}
                            </span>
                          </li>
                        );
                      })}
                    {/* {(program.features ?? []).length > 4 && (
      <li>
        <button 
          onClick={() => toggleFeatures(program.id)}
          className="text-sm text-[#01BAEF] font-medium hover:underline cursor-pointer transition-colors flex items-center"
        >
          {expandedFeatureCards[program.id] ? (
            <>
              <span>Show less</span>
              <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              <span>+{(program.features ?? []).length - 4} more features</span>
              <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </li>
    )} */}
                  </ul>
                </div>
                <div className="mt-auto">
                  <Link
                    href={`/details?program=${program.id}`}
                    className="btn btn--theme hover--tra-white block w-full !rounded-[4px]"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
