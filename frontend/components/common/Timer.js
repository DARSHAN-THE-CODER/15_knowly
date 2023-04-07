import { useState, useEffect } from 'react';

function useTimer(initialDuration) {
  const [duration, setDuration] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setDuration((prevDuration) => {
          if (prevDuration === 0) {
            setIsRunning(false);
            return 0;
          }
          return prevDuration - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = (newDuration) => setDuration(newDuration);

  return { duration, isRunning, startTimer, stopTimer, resetTimer };
}
