import React, { useEffect, useState, useCallback } from 'react';

interface ResendProps {
  btnLabel?: string;
  text?: string;
  second?: number;
  onResendClick: () => void;
}

export const ResendOTP: React.FC<ResendProps> = ({
  second = 10,
  btnLabel = "Resend OTP",
  text = "Didn't receive the otp?",
  onResendClick=()=>{}
}) => {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(second);

  const handleResend = useCallback(() => {
    setIsTimerActive(true);
    setSecondsLeft(second);
    onResendClick()
  }, [second]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (isTimerActive && secondsLeft >= 0) {
      timerId = setTimeout(() => {
        if (isTimerActive && secondsLeft === 0) {
          setIsTimerActive(false);
          setSecondsLeft(second);
        } else {
          setSecondsLeft(prev => prev - 1)
        }
      }, 1000);
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
