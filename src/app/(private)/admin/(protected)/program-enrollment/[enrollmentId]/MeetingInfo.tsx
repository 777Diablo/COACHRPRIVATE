import { api } from "@/trpc/react";
import { HiButton, HiInput, HiModal } from "@hidstech/common_components";
import { Edit2Icon } from "lucide-react";
import React from "react";

type Props = {
  meetingUrl?: string | null;
  enrollmentId: string;
};
const MeetingInfo: React.FC<Props> = ({ meetingUrl, enrollmentId }) => {
  const [isOpen, setOpen] = React.useState(false);

  const [formState, setFormState] = React.useState(meetingUrl ?? "");

  const utils = api.useUtils();

  const enrollmentMutation = api.programEnrollment.update.useMutation({
    onSuccess: async () => {
      await utils.programEnrollment.getOne.invalidate();
      setOpen(false);
    },
  });

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    enrollmentMutation.mutate({
      id: enrollmentId,
      meetingUrl: formState,
    });
  };

  return (
    <>
      <div className="mt-6">
        <h3 className="mb-2 font-semibold">
          Meeting Link
          {meetingUrl && (
            <HiButton
              variant="outline"
              size="icon"
              className="ml-2 h-8 w-8 p-1"
              onClick={handleOpen}
            >
              <Edit2Icon className="size-4 cursor-pointer" />
            </HiButton>
          )}
        </h3>
        <div>
          {meetingUrl ? (
            meetingUrl
          ) : (
            <HiButton onClick={handleOpen}>Add Meeting Link</HiButton>
          )}
        </div>
      </div>

      {/* modal */}
      <HiModal open={isOpen} onClose={handleClose} title="Meeting Link">
        <form className="space-y-4">
          <HiInput
            label="Url"
            value={formState}
            onChange={(e) => setFormState(e.target.value)}
          />
          <HiButton
            onClick={handleSubmit}
            isLoading={enrollmentMutation.isPending}
          >
            Save
          </HiButton>
        </form>
      </HiModal>
    </>
  );
};

export default MeetingInfo;
