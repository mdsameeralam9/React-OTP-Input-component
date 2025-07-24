import React, { useEffect, useState, useCallback } from 'react';
import './style.css';

interface ResendProps {
  btnLabel?: string;
  text?: string;
  second?: number;
  onResendClick: () => void;
  className?: string;
}

export const ResendOTP: React.FC<ResendProps> = ({
  second = 10,
  btnLabel = "Resend OTP",
  text = "Didn't receive the otp?",
  onResendClick = () => {},
  className = ''
}) => {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(second);

  const handleResend = useCallback(() => {
    setIsTimerActive(true);
    setSecondsLeft(second);
    onResendClick();
  }, [second, onResendClick]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (isTimerActive && secondsLeft >= 0) {
      timerId = setTimeout(() => {
        if (isTimerActive && secondsLeft === 0) {
          setIsTimerActive(false);
          setSecondsLeft(second);
        } else {
          setSecondsLeft(prev => prev - 1);
        }
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [isTimerActive, secondsLeft, second]);

  const formattedTime = secondsLeft < 10 ? `00:0${secondsLeft}` : `00:${secondsLeft}`;

  return (
    <div className={`resendComponent ${className}`} role="timer" aria-live="polite">
      {isTimerActive ? (
        <>
          <span className='resend-text'>Resend OTP in</span>
          <span className='resend-timer'>{formattedTime}</span>
        </>
      ) : (
        <>
          <span className='resend-text'>{text}</span>
          <button 
            className='resend-button' 
            onClick={handleResend}
            aria-label={btnLabel}
            type="button"
          >
            {btnLabel}
          </button>
        </>
      )}
    </div>
  );
}
