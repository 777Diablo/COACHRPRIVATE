"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@hidstech/common_components/components/ui/button.js";
import { Card } from "@hidstech/common_components/components/ui/card.js";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/lib/uploadFile";
import CustomLoader from "@/components/CustomLoader";
import { HiLoader } from "@hidstech/common_components";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

// Mock questions with different durations
// const questions = [
//   { text: "Tell us about yourself.", duration: 60 },
//   { text: "What's your greatest professional achievement?", duration: 90 },
//   { text: "Where do you see yourself in 5 years?", duration: 45 },
//   { text: "Why do you want to work for our company?", duration: 60 },
//   {
//     text: "Describe a challenging work situation and how you overcame it.",
//     duration: 120,
//   },
// ] as const;

export default function VideoInterview({
  programId,
  enrollmentId,
}: {
  programId: string;
  enrollmentId: string;
}) {
  const { data, isLoading } = api.question.getAll.useQuery();
  const questions = data?.questions ?? [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [interviewFinished, setInterviewFinished] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const updateMutation = api.programEnrollment.update.useMutation();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data?.questions && data?.questions.length > 0) {
      // setTimeLeft(data?.questions[0]?.duration ?? 30);
      setTimeLeft(data?.questions[0]?.duration ?? 30);
    }
  }, [data, isLoading]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setupVideo() {
      try {
        if (!videoRef.current) return;
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;

        // Set up MediaRecorder
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });

          // Convert Blob to File
          const file = new File(
            [blob],
            `interview${new Date().getTime()}.webm`,
            {
              type: "video/webm",
            },
          );

          // Create a download link (optional, for user download)
          // const url = URL.createObjectURL(blob);
          // const a = document.createElement("a");
          // document.body.appendChild(a);
          // a.style.display = "none";
          // a.href = url;
          // a.download = file.name;
          // a.click();
          // window.URL.revokeObjectURL(url);
          chunksRef.current = [];

          // Stop the camera
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }

          // Upload the video file
          try {
            const uploadResponse = await uploadFiles("videoUploader", {
              files: [file],
              onUploadBegin: () => {
                // console.log("Upload started");
                setShowLoader(true);
              },
              onUploadProgress: (value: { progress: number }) => {
                // console.log("Upload progress:", value?.progress);
                setUploadProgress(value?.progress);
              },
            });
            // console.log("Uploaded video details:", uploadResponse);

            updateMutation.mutate(
              {
                id: enrollmentId,
                recordingUrl: uploadResponse[0]?.url,
              },
              {
                onSuccess: () => {
                  toast.success("Success");
                  setShowLoader(false);
                  // Redirect after successful upload
                  window.location.href = "/u/program/success";
                },
                onError: (error) => {
                  toast.error(error.message);
                  setShowLoader(false);
                },
              },
            );
          } catch (error) {
            console.error("Error uploading video:", error);
            // Handle upload failure (e.g., show a user notification)
          }
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        setVideoError((err as Error).message);
        console.error("Error accessing the camera:", err);
      }
    }

    setupVideo()
      .then(() => console.log("Video started"))
      .catch(console.error);

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []); // Ensure empty dependency array

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (!prevTime) return prevTime;

  //       if (prevTime <= 1) {
  //         const hasNext = handleNextQuestion();

  //         return hasNext
  //           ? (questions[currentQuestionIndex + 1]?.duration ?? 30)
  //           : 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (!prevTime) return prevTime;

        if (prevTime <= 1) {
          const hasNext = handleNextQuestion();
          return hasNext
            ? (questions[currentQuestionIndex + 1]?.duration ?? 30)
            : 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Stop current recording
      // if (mediaRecorderRef.current && isRecording) {
      //   mediaRecorderRef.current.stop();
      // }

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      // setTimeLeft(questions[currentQuestionIndex + 1]?.duration ?? 30);
      setTimeLeft(questions[currentQuestionIndex + 1]?.duration ?? 30);

      return true;
      // Start new recording
      // setTimeout(() => {
      //   if (mediaRecorderRef.current) {
      //     mediaRecorderRef.current.start();
      //     setIsRecording(true);
      //   }
      // }, 1000); // Small delay to ensure previous recording is processed
    } else {
      // Interview finished
      setInterviewFinished(true);
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
      return false;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="relative">
        {/* {videoError ? (
          <Alert
            variant="destructive"
            className="absolute right-2 top-2 z-10 h-24 w-32" 
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-xs">
              {videoError}
            </AlertDescription>
          </Alert>
        ) : (
          // isVideoOn && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute right-2 top-2 z-10 h-24 w-32 rounded-md object-cover shadow-md"
          />
          // )
        )} */}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute right-2 top-2 z-10 h-24 w-32 rounded-md object-cover shadow-md"
        />
      </div>
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-4xl space-y-6 p-6">
          <h1 className="text-center text-2xl font-bold">Video Interview</h1>

          <div className="relative">
            <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-white p-6 shadow-sm">
              {interviewFinished ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <HiLoader />
                  <p className="text-center text-xl">
                    Thank you for completing the interview!
                  </p>
                  <p className="text-center">
                    Please do not refresh or close this page as we are proce
                    your video.
                  </p>
                </div>
              ) : (
                <p className="text-center text-xl">
                  {questions[currentQuestionIndex]?.name}
                </p>
              )}
            </div>
          </div>

          {!interviewFinished && (
            <>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">
                  Time left: {timeLeft ? formatTime(timeLeft) : "NA"}
                </div>
                <Button
                  onClick={handleNextQuestion}
                  // disabled={currentQuestionIndex === questions.length - 1}
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish"
                    : "Next Question"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </>
          )}

          {isRecording && (
            <div className="flex items-center justify-center space-x-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
              <span className="text-sm text-red-500">Recording</span>
            </div>
          )}
        </Card>
        <CustomLoader
          show={showLoader}
          progress={uploadProgress}
          message="Please do not refresh or close this page. We are processing your upload, and it may take a few moments. Thank you for your patience!"
        />
      </div>
    </>
  );
}
