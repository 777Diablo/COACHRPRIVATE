import React from "react";

import { type Inquiry } from "@prisma/client";

const EditForm = ({
  type,
  data,
  closeModal,
}: {
  type: "edit" | "add" | "view";
  data?: Inquiry;
  closeModal: () => void;
}) => {
  return (
    <>
      <div className="grid gap-4 py-4">
        {type === "view" ? (
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Name:</span>
              <span>{data?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Email:</span>
              <span>{data?.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Mobile:</span>
              <span>{data?.mobile}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Message:</span>
              <span>{data?.message}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Status:</span>
              <span>{data?.status}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default EditForm;
