import { useState, useRef, useEffect, useCallback } from 'react';

const useResend= ({ maxTime = 60, timeInterval=1000, onResendClick=()=>{} }) => {
  const [remainingTime, setRemainingTime] = useState<number>(Math.min(Math.max(maxTime, 0), 60));
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
        if(isTimerActive && remainingTime === 0){
           setIsTimerActive(false)
        } else {
          setRemainingTime(r => r - 1);
        }
     
    }, timeInterval);

    return () => clearTimeout(timerRef.current);
  }, [remainingTime, timeInterval]);


    const handleResendClick = useCallback(() => {
      setIsTimerActive(true);
      setRemainingTime(maxTime);
      onResendClick();
    }, [maxTime, onResendClick]);

  return { remainingTime, isTimerActive, handleResendClick };
};

export default useResend;