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
  timerLabel?: string,

  // handle style 
  renderTimeClass?: string
  renderTimeStyle?: React.CSSProperties;
  resendButtonClass?: string;
  resendButtonStyle?: React.CSSProperties;

}

export const ResendOTP: React.FC<ResendProps> = ({
  className = '',
  renderTime,
  renderResendButton,
  timerLabel = "Resend OTP in",
  resendButtonLabel = "Resend OTP",
  resendDisplayLabel = "Didn't receive the otp?",
  renderTimeClass = "",
  renderTimeStyle = {},
  resendButtonClass = "",
  resendButtonStyle = {},

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
            <RenderTimeDefault
              timerLabel={timerLabel}
              displayRemainingTime={displayRemainingTime}
              renderTimeClass={renderTimeClass}
              renderTimeStyle={renderTimeStyle}
            />
          }
        </Fragment>

      ) : (
        <Fragment>
          {renderResendButton ? renderResendButton(handleResendClick) :
            <ResendButtonDefault
              resendDisplayLabel={resendDisplayLabel}
              handleResendClick={handleResendClick}
              resendButtonLabel={resendButtonLabel}
              resendButtonClass={resendButtonClass}
              resendButtonStyle={resendButtonStyle}
            />
          }
        </Fragment>
      )}
    </div>
  );
}

const RenderTimeDefault = ({ timerLabel = "", displayRemainingTime = "", renderTimeClass = "", renderTimeStyle = {} }) => {
  return (
    <div className={`renderTimeDefaultClass ${renderTimeClass && renderTimeClass}`}
      style={renderTimeStyle}
    >
      <span className='resend-text'>{timerLabel}</span>
      <span className='resend-timer'>{displayRemainingTime}</span>
    </div>
  )
}


const ResendButtonDefault = ({ resendDisplayLabel = "", resendButtonLabel = "", handleResendClick = () => { }, resendButtonClass = "", resendButtonStyle = {} }) => {
  return (
    <div className={`renderTimeDefaultClass ${resendButtonClass && resendButtonClass}`}
      style={resendButtonStyle}
    >
      <span className='resend-text'>{resendDisplayLabel}</span>
      <button
        className='resend-button'
        onClick={handleResendClick}
        aria-label={resendButtonLabel}
        type="button"
      >
        {resendButtonLabel}
      </button>
    </div>
  )
}



