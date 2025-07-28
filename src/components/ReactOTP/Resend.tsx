import React, { Fragment } from 'react';
import './style.css';
import useResendOTP from './hooks/useResendOTP';
import { getMinutesAndSeconds, formattedTime } from './util';

interface CommonStyleProps {
  renderTimeClass?: string;
  renderTimeStyle?: React.CSSProperties;
  resendButtonClass?: string;
  resendButtonStyle?: React.CSSProperties;
  resendDisplayLabelStyle?: React.CSSProperties;
  resendButtonLabelStyle?: React.CSSProperties;
  resendButtonLabelClass?: string;
  resendDisplayLabelClass?: string;
  timerLabelStyle?: React.CSSProperties;
  displayRemainingTimeStyle?: React.CSSProperties;
  resendTimerClass?: string;
  resendTextClass?: string;
}

interface ResendProps extends CommonStyleProps {
  resendButtonLabel?: string;
  resendDisplayLabel?: string;
  maxTime?: number;
  onResendClick: () => void;
  className?: string;
  renderTime?: (args: {
    remainingTime: number;
    displayRemainingTime: string;
  }) => React.ReactNode;
  renderResendButton?: (handleResendClick: () => void) => React.ReactNode;
  timerLabel?: string;
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
          {renderTime ? (
            renderTime({ remainingTime, displayRemainingTime })
          ) : (
            <RenderTimeDefault
              displayRemainingTime={displayRemainingTime}
              {...props}
            />
          )}
        </Fragment>
      ) : (
        <Fragment>
          {renderResendButton ? (
            renderResendButton(handleResendClick)
          ) : (
            <ResendButtonDefault
              handleResendClick={handleResendClick}
              {...props}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

const RenderTimeDefault: React.FC<
  {
    timerLabel?: string;
    displayRemainingTime?: string;
  } & CommonStyleProps
> = ({
  timerLabel = 'Resend OTP in',
  displayRemainingTime = '',
  renderTimeClass = '',
  renderTimeStyle = {},
  timerLabelStyle = {},
  displayRemainingTimeStyle = {},
  resendTimerClass = '',
  resendTextClass = '',
}) => (
    <div className={`renderTimeDefaultClass ${renderTimeClass}`} style={renderTimeStyle}>
      <span className={`resend-text ${resendTextClass}`} style={timerLabelStyle}>
        {timerLabel}
      </span>
      <span className={`resend-timer ${resendTimerClass}`} style={displayRemainingTimeStyle}>
        {displayRemainingTime}
      </span>
    </div>
  );

const ResendButtonDefault: React.FC<
  {
    resendButtonLabel?: string;
    resendDisplayLabel?: string;
    handleResendClick?: () => void;
  } & CommonStyleProps
> = ({
  resendButtonLabel = 'Resend OTP',
  resendDisplayLabel = "Didn't receive the otp?",
  handleResendClick = () => { },
  resendButtonClass = '',
  resendButtonStyle = {},
  resendDisplayLabelStyle = {},
  resendButtonLabelStyle = {},
  resendButtonLabelClass = '',
  resendDisplayLabelClass = '',
}) => (
    <div className={`renderTimeDefaultClass ${resendButtonClass}`} style={resendButtonStyle}>
      <span className={`resend-text ${resendDisplayLabelClass}`} style={resendDisplayLabelStyle}>
        {resendDisplayLabel}
      </span>
      <button
        className={`resend-button ${resendButtonLabelClass}`}
        onClick={handleResendClick}
        aria-label={resendButtonLabel}
        type="button"
        style={resendButtonLabelStyle}
      >
        {resendButtonLabel}
      </button>
    </div>
  );
