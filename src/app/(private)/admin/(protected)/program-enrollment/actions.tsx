"use client";

import { api } from "@/trpc/react";
import {
  Form,
  HiButton,
  HiDropdown,
  HiModal,
} from "@hidstech/common_components";
import { User } from "lucide-react";
import { useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

export const AssignCoachAction = ({
  enrollmentId,
}: {
  enrollmentId: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    // AssignCoachAction(false);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {/* icon for action */}
      <HiButton
        variant="outline"
        onClick={handleOpen}
        data-tooltip-id="assign-coach"
      >
        <span className="sr-only">Assign Coach</span>
        <User />
        <Tooltip id={"assign-coach"} content={"Assign Coach"} />
      </HiButton>

      <HiModal title="Assign Coach" open={isOpen} onClose={handleClose}>
        <CoachInput enrollmentId={enrollmentId} handleClose={handleClose} />
      </HiModal>
    </div>
  );
};

const formSchema = z.object({
  coach: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

const CoachInput = ({
  enrollmentId,
  handleClose,
}: {
  enrollmentId: string;
  handleClose: () => void;
}) => {
  const utils = api.useUtils();

  const { data, error, isLoading } = api.user.getUsersByRole.useQuery({
    roles: ["coach"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const updateMutation = api.programEnrollment.update.useMutation({
    onSuccess: async () => {
      await utils.programEnrollment.getAll.invalidate();
    },
  });

  const menuOptions = useMemo(
    () =>
      data?.users?.map((user) => ({
        label: user.name,
        value: user.id,
      })),
    [data?.users],
  );

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    updateMutation.mutate(
      {
        id: enrollmentId,
        assignedCoach: data.coach.value,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Coach assigned successfully");
          handleClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <HiDropdown
            label="Coach"
            name="coach"
            form={form}
            options={menuOptions}
            isLoading={isLoading}
            isSearchable={true}
            placeholder="Select Coach"
            isDisabled={updateMutation.isPending}
            fullWidth
          />

          <HiButton
            type="submit"
            className="mt-4"
            isLoading={updateMutation.isPending}
          >
            Submit
          </HiButton>
        </form>
      </Form>
    </div>
  );
};
