"use client";

import React, { useState, useEffect } from "react";
import { useNetworkState } from "@uidotdev/usehooks";
interface PreTestCheckProps {
  onStartTest: () => void; // Callback for starting the test
}

const PreTestCheck: React.FC<PreTestCheckProps> = ({ onStartTest }) => {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioCheck, setAudioCheck] = useState(false);
  const [internetCheck, setInternetCheck] = useState(true);

  const network = useNetworkState();

  // Function to check internet connection speed
  const checkInternetConnection = async () => {
    try {
    } catch {
      setInternetCheck(false);
    }
  };

  // Function to handle audio check
  const handleAudioCheck = () => {
    // ask permission for audio
    // setAudioCheck(true); // Simulate audio check; implement actual check logic as needed
  };

  // Function to initialize video stream
  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setVideoStream(stream);
        setAudioCheck(true);
      } catch (error) {
        console.error("Unable to access video stream:", error);
      }
    };

    startVideoStream().catch((error) => {
      console.error("Unable to start video stream:", error);
    });

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-xl font-bold">Pre-Test Check</h1>

        {/* Video Preview */}
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-medium">Video Preview</h2>
          {videoStream ? (
            <video
              className="w-full rounded shadow"
              autoPlay
              muted
              playsInline
              ref={(video) => {
                if (video) video.srcObject = videoStream;
              }}
            />
          ) : (
            <p className="text-gray-500">Unable to access camera</p>
          )}
        </div>

        {/* Audio Check */}
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-medium">Audio Check</h2>
          <button
            onClick={handleAudioCheck}
            className={`w-full rounded py-2 ${
              audioCheck ? "bg-green-500" : "bg-blue-500"
            } text-white`}
          >
            {audioCheck ? "Audio Checked" : "Check Audio"}
          </button>
        </div>

        {/* Internet Connection Check */}
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-medium">Internet Connection</h2>
          {/* <button
            onClick={checkInternetConnection}
            className={`w-full rounded py-2 ${
              internetCheck ? "bg-green-500" : "bg-blue-500"
            } text-white`}
          >
            {internetCheck ? "Internet Stable" : "Check Internet"}
          </button> */}
          <pre>{JSON.stringify(network)}</pre>
          {network ? (
            <div>
              <p className="text-gray-500">type : {network.type}</p>
              <p className="text-gray-500">downlink : {network.downlink}</p>
              <p className="text-gray-500">
                downlinkMax : {network.downlinkMax}
              </p>
              <p className="text-gray-500">
                effectiveType : {network.effectiveType}
              </p>
              <p className="text-gray-500">rtt : {network.rtt}</p>
              <p className="text-gray-500">online : {network.online}</p>
            </div>
          ) : (
            <p className="text-gray-500">No Internet Connection</p>
          )}
        </div>

        {/* Start Test Button */}
        <button
          onClick={onStartTest}
          disabled={!audioCheck || !internetCheck || !videoStream}
          className={`w-full rounded py-3 ${
            audioCheck && internetCheck && videoStream
              ? "bg-green-600 hover:bg-green-700"
              : "cursor-not-allowed bg-gray-400"
          } font-bold text-white`}
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default PreTestCheck;
