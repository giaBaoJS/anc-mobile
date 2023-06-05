/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export default function useTimer() {
  const [timerCount, setTimer] = useState(59);
  let interval: any;
  const resetTimer = (time: number, start: boolean) => {
    setTimer(time);
    if (start) {
      interval = setInterval(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  };
  useEffect(() => {
    resetTimer(59, false);
  }, []);
  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  return [timerCount, resetTimer] as any;
}
