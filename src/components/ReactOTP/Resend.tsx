import React, { Fragment } from 'react';
import './style.css';
import useResend from './hooks/useResend';

interface ResendProps {
  btnLabel?: string;
  text?: string;
  maxTime?: number;
  onResendClick: () => void;
  className?: string;
  renderTime?: (formattedTime: string) => React.ReactNode;
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
  const { remainingTime, isTimerActive, handleResendClick } = useResend(props)
  const formattedTime = remainingTime < 10 ? `00:0${remainingTime}` : `00:${remainingTime}`;

  return (
    <div className={`resendComponent ${className}`} role="timer" aria-live="polite">
      {isTimerActive ? (
        <Fragment>
          {renderTime ? renderTime(formattedTime) :
            <Fragment>
              <span className='resend-text'>Resend OTP in</span>
              <span className='resend-timer'>{formattedTime}</span>
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
