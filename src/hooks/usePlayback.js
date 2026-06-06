import { useEffect, useState } from "react";

function usePlayback(totalSteps) {
  const [currentStep, setCurrentStep] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [speed, setSpeed] =
    useState(700);

  useEffect(() => {
    if (!isPlaying) return;

    const interval =
      setInterval(() => {
        setCurrentStep((prev) => {
          if (
            prev >= totalSteps - 1
          ) {
            setIsPlaying(false);
            return prev;
          }

          return prev + 1;
        });
      }, speed);

    return () =>
      clearInterval(interval);
  }, [
    isPlaying,
    speed,
    totalSteps,
  ]);

  const play = () =>
    setIsPlaying(true);

  const pause = () =>
    setIsPlaying(false);

  const next = () =>
    setCurrentStep((prev) =>
      Math.min(
        prev + 1,
        totalSteps - 1
      )
    );

  const prev = () =>
    setCurrentStep((prev) =>
      Math.max(prev - 1, 0)
    );

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return {
    currentStep,
    setCurrentStep,

    isPlaying,

    speed,
    setSpeed,

    play,
    pause,
    next,
    prev,
    reset,
  };
}

export default usePlayback;