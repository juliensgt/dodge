import { useEffect, useRef } from "react";

interface UseTimerOptions {
  initialTime: number;
  onTimeUpdate?: (time: number) => void;
  onTimerEnd?: () => void;
  isActive?: boolean;
  interval?: number; // in milliseconds, default 1000
}

export function useTimer({
  initialTime,
  onTimeUpdate,
  onTimerEnd,
  isActive = true,
  interval = 1000,
}: UseTimerOptions) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(initialTime);

  useEffect(() => {
    if (!isActive || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      timeRef.current -= 1;

      if (onTimeUpdate) {
        onTimeUpdate(timeRef.current);
      }

      if (timeRef.current <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;

        if (onTimerEnd) {
          onTimerEnd();
        }
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, onTimeUpdate, onTimerEnd, interval]);

  // Reset timer when initialTime changes
  useEffect(() => {
    timeRef.current = initialTime;
  }, [initialTime]);

  const resetTimer = () => {
    timeRef.current = initialTime;
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    resetTimer,
    stopTimer,
  };
}
