import React, { Fragment } from 'react';
import './style.css';
import useResendOTP from './hooks/useResendOTP';
import { getMinutesAndSeconds, formattedTime } from './util';

interface ResendProps {
  resendButtonLabel?: string;
  resendDisplayLabel?: string;
  maxTime?: number;
  onResendClick: () => void;
  className?: string;
  renderTime?: (remainingTime: string) => React.ReactNode;
  renderResendButton?: (handleResendClick: any) => React.ReactNode;
  timerLabel?:string
}

export const ResendOTP: React.FC<ResendProps> = ({
  className = '',
  renderTime,
  renderResendButton,
  timerLabel="Resend OTP in",
  resendButtonLabel="Resend OTP",
  resendDisplayLabel="Didn't receive the otp?",
  ...props
}) => {
  const { remainingTime, isTimerActive, handleResendClick } = useResendOTP(props);
  const { minutes, seconds } = getMinutesAndSeconds(remainingTime);

 const displayRemainingTime = `${formattedTime(minutes)}:${formattedTime(seconds)}`;

  return (
    <div className={`resendComponent ${className}`} role="timer" aria-live="polite">
      {isTimerActive ? (
        <Fragment>
          {renderTime ? renderTime(remainingTime) :
            <Fragment>
              <span className='resend-text'>{timerLabel}</span>
              <span className='resend-timer'>{displayRemainingTime}</span>
            </Fragment>
          }
        </Fragment>

      ) : (
        <Fragment>
          {renderResendButton ? renderResendButton(handleResendClick) :
            <>
              <span className='resend-text'>{resendDisplayLabel}</span>
              <button
                className='resend-button'
                onClick={handleResendClick}
                aria-label={resendButtonLabel}
                type="button"
              >
                {resendButtonLabel}
              </button>
            </>
          }
        </Fragment>
      )}
    </div>
  );
}
