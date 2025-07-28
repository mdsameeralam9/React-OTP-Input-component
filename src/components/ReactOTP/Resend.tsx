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
  renderTime?: ({ }) => React.ReactNode;
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
  ...props
}) => {
  const { remainingTime, isTimerActive, handleResendClick } = useResendOTP(props);
  const { minutes, seconds } = getMinutesAndSeconds(remainingTime);

  const displayRemainingTime = `${formattedTime(minutes)}:${formattedTime(seconds)}`;

  return (
    <div className={`resendComponent ${className}`} role="timer" aria-live="polite">
      {isTimerActive ? (
        <Fragment>
          {renderTime ? renderTime({ remainingTime, displayRemainingTime }) :
            <RenderTimeDefault
              displayRemainingTime={displayRemainingTime}
              { ...props}
            />
          }
        </Fragment>

      ) : (
        <Fragment>
          {renderResendButton ? renderResendButton(handleResendClick) :
            <ResendButtonDefault
              handleResendClick={handleResendClick}
              { ...props}
            />
          }
        </Fragment>
      )}
    </div>
  );
}

const RenderTimeDefault = ({
  timerLabel = "Resend OTP in",
  displayRemainingTime = "",
  renderTimeClass = "",
  renderTimeStyle = {},
  timerLabelStyle = {},
  displayRemainingTimeStyle = {},
  resendTimerClass = '',
  resendTextClass = ""
}) => {
  return (
    <div className={`renderTimeDefaultClass ${renderTimeClass && renderTimeClass}`}
      style={renderTimeStyle}
    >
      <span className={`resend-text ${resendTextClass && resendTextClass}`} style={timerLabelStyle}>{timerLabel}</span>
      <span className={`resend-timer ${resendTimerClass && resendTimerClass}`} style={displayRemainingTimeStyle}>{displayRemainingTime}</span>
    </div>
  )
}


const ResendButtonDefault = ({
  resendButtonLabel = "Resend OTP",
  resendDisplayLabel = "Didn't receive the otp?",
  handleResendClick = () => { },
  resendButtonClass = "",
  resendButtonStyle = {}
}) => {
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



