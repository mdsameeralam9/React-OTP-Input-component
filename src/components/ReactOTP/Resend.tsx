import React, { useEffect, useState, useCallback } from 'react';

interface ResendProps {
  btnLabel?: string;
  text?: string;
  second?: number;
}

export const Resend: React.FC<ResendProps> = ({ 
  second = 10, 
  btnLabel = "Resend OTP", 
  text = "Didn't receive the otp?" 
}) => {
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(second);

  const handleResend = useCallback(() => {
    setIsTimerActive(true);
    setSecondsLeft(second);
  }, [second]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    
    if (isTimerActive && secondsLeft > 0) {
      timerId = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
    } else if (isTimerActive && secondsLeft === 0) {
      setIsTimerActive(false);
      setSecondsLeft(second);
    }

    return () => clearTimeout(timerId);
  }, [isTimerActive, secondsLeft, second]);

  const formattedTime = secondsLeft < 10 ? `00:0${secondsLeft}` : `00:${secondsLeft}`;

  return (
    <div className='resendComponent'>
      {isTimerActive ? (
        <>
          <span className='resend-text'>Resend OTP in</span>
          <span className='resend-button'>{formattedTime}</span>
        </>
      ) : (
        <>
          <span className='resend-text'>{text}</span>
          <span className='resend-button' onClick={handleResend}>{btnLabel}</span>
        </>
      )}
    </div>
  );
}
