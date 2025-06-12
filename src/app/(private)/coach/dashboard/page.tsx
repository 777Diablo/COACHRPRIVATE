import React from "react";

const page = () => {
  return (
    <div className="container pt-8">
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="section_card aspect-video rounded-xl" />
          <div className="section_card aspect-video rounded-xl" />
          <div className="section_card aspect-video rounded-xl" />
        </div>
        <div className="section_card min-h-[300px]" />
      </div>
    </div>
  );
};

export default page;
