import React, { Fragment } from 'react';
import './style.css';
import useResendOTP from './hooks/useResendOTP';
import { getMinutesAndSeconds, formattedTime } from './util';

interface ResendProps {
  btnLabel?: string;
  text?: string;
  maxTime?: number;
  onResendClick: () => void;
  className?: string;
  renderTime?: (remainingTime: string) => React.ReactNode;
  renderResendButton?: (handleResendClick: any) => React.ReactNode;
}

export const ResendOTP: React.FC<ResendProps> = ({
  btnLabel = "Resend OTP",
  text = "Didn't receive the otp?",
  className = '',
  renderTime,
  renderResendButton,
  ...props
}) => {
  const { remainingTime, isTimerActive, handleResendClick } = useResendOTP(props);
  const { minutes, seconds } = getMinutesAndSeconds(remainingTime);

  console.log(remainingTime, minutes, seconds)

 const displayRemainingTime = `${formattedTime(minutes)}:${formattedTime(seconds)}`;

  return (
    <div className={`resendComponent ${className}`} role="timer" aria-live="polite">
      {isTimerActive ? (
        <Fragment>
          {renderTime ? renderTime(remainingTime) :
            <Fragment>
              <span className='resend-text'>Resend OTP in</span>
              <span className='resend-timer'>{displayRemainingTime}</span>
            </Fragment>
          }
        </Fragment>

      ) : (
        <Fragment>
          {renderResendButton ? renderResendButton(handleResendClick) :

            <>
              <span className='resend-text'>{text}</span>
              <button
                className='resend-button'
                onClick={handleResendClick}
                aria-label={btnLabel}
                type="button"
              >
                {btnLabel}
              </button>
            </>
          }
        </Fragment>
      )}
    </div>
  );
}
