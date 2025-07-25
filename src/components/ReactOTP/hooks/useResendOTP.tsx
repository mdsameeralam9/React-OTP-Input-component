import { useState, useEffect, useCallback, useRef } from 'react';
import { initialRemainValue } from '../util';

const useResendOTP = ({ maxTime = 60, timeInterval = 1000, onResendClick = () => {} }) => {
  const [remainingTime, setRemainingTime] = useState(initialRemainValue(maxTime));
  const [isTimerActive, setIsTimerActive] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isTimerActive) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          clearInterval(intervalRef.current!);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, timeInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    
  }, [isTimerActive, timeInterval]);

  const handleResendClick = useCallback(() => {
    setRemainingTime(initialRemainValue(maxTime));
    setIsTimerActive(true);
    onResendClick();
  }, [maxTime, onResendClick]);

  return { remainingTime, isTimerActive, handleResendClick };
};

export default useResendOTP;
