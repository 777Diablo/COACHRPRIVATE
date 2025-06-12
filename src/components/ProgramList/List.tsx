// "use client";
// import { useRouter } from "next/navigation";
// import { ProgramCard } from "./ProgramCard";
// import { Program } from "@prisma/client";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // Extended Program type to include features
// type ProgramWithFeatures = Program & {
//   features?: Array<Record<string, any>>;
// };

// export function List({ programs }: { programs: ProgramWithFeatures[] }) {
//   //   useEffect(() => {
//   //     console.log("Programs Data in Browser:", programs);
//   //   }, [programs]);
//   const router = useRouter();

//   const handleViewDetails = (programId: string) => {
//     router.push(`/details?program=${programId}`);
//   };



//   // React Slick settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // Number of visible slides
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024, // Tablet view
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600, // Mobile view
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//     // nextArrow: <SampleNextArrow />,
//     // prevArrow: <SamplePrevArrow />,
//   };

//   return (
//     <div className="relative px-8">
//       <div className="mb-16 text-center">
//         <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
//           Choose Your Program
//         </h2>
//         <p className="mx-auto max-w-2xl text-foreground">
//           Select the perfect program that matches your career goals and
//           preparation needs
//         </p>
//       </div>

//       <Slider {...sliderSettings}>
//         {programs.map((program, index) => (
//           <div key={program.id} className="px-2">
//             <ProgramCard
//               program={program}
//               onViewDetails={() => handleViewDetails(program.id)}
//               index={index}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }





"use client";
import { useRouter } from "next/navigation";
import { ProgramCard } from "./ProgramCard";
import { Program } from "@prisma/client";

type ProgramWithFeatures = Program & {
  features?: Array<Record<string, any>>;
};

export function List({ programs }: { programs: ProgramWithFeatures[] }) {
  const router = useRouter();

  const handleViewDetails = (programId: string) => {
    router.push(`/details?program=${programId}`);
  };
  console.log("Programs in List Component:", programs);
  return (
    <div className="relative px-8">
      {/* <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
          Choose Your Program
        </h2>
        <p className="mx-auto max-w-2xl text-foreground">
          Select the perfect program that matches your career goals and
          preparation needs
        </p>
      </div> */}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div key={program.id} className="px-2">
            <ProgramCard
              program={program}
              onViewDetails={() => handleViewDetails(program.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
