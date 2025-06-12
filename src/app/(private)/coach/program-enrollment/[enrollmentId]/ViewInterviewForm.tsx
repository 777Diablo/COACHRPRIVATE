import { api } from "@/trpc/react";
import { type GetOneProgramEnrollment } from "@/types";
import { cn, HiButton, HiInputTextArea } from "@hidstech/common_components";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";

// import { useCreateCourse, useUpdateCourse } from '@/hooks/useCourse';
// import { zodValidateNumber } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const ViewInterviewForm = ({ data }: { data: GetOneProgramEnrollment }) => {
  const videoRef = useRef<
    HTMLVideoElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullScreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    }
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState(data?.feedback ?? "");

  const utils = api.useUtils();
  const enrollmentMutation = api.programEnrollment.update.useMutation({
    onSuccess: async () => {
      await utils.programEnrollment.getOne.invalidate({
        id: data?.id,
      });
      toast.success("Saved Successfully");
    },
  });

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFeedback(event.target.value);
  };

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: '',
  //   },
  // });
  // const { isSubmitting, isValid, errors } = form.formState;

  // const { mutate: create, ...createResult } = useCreateCourse({
  //   onSuccess: () => handleClose(),
  // });
  // const { mutate: update, ...updateResult } = useUpdateCourse({ courseId: data?.id }, { onSuccess: () => handleClose() });

  // useEffect(() => {
  //   if (data) {
  //     form.reset({
  //       title: data.title,
  //     });
  //   }
  // }, []);

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   const payload = { ...values };
  //   if (type === 'edit' && data?.id) {
  //     update({ id: data?.id, data: payload });
  //   } else create(payload);
  // };

  // const handleClose = () => {
  //   closeModal();
  //   form.reset();
  // };

  const togglePlayPause = async () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        await videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSaveFeedback = () => {
    if (data?.id) {
      enrollmentMutation.mutate({
        id: data.id,
        feedback,
      });
      return;
    }
    toast.error("Something went wrong");
  };

  return (
    <>
      <div
        className={cn(
          "grid gap-4 py-4",
          data?.recordingUrl ? "md:grid-cols-2" : "md:grid-cols-1",
        )}
      >
        {data?.recordingUrl ? (
          <div className="overflow-hidden rounded border-4 border-blue-500">
            <video ref={videoRef} className="w-full">
              {/*  eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              <source src={data.recordingUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={togglePlayPause}
              className="mt-[-2px] w-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        ) : // <div className="section_card py-4">
        //   <p className="text-center text-red-500">No recording found</p>
        // </div>
        null}
        {/* text are to write feedback */}
        <div className="space-y-4">
          <HiInputTextArea
            label="Feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback"
            rows={20}
          />
          <HiButton
            title="Save"
            onClick={handleSaveFeedback}
            isLoading={enrollmentMutation.isPending}
          />
        </div>
      </div>
    </>
  );
};

export default ViewInterviewForm;
