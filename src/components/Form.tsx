import React from 'react';
import OtpInput, { ResendOTP } from './ReactOTP';
import type { OTPIFormProps } from '../App';


interface FormProps extends OTPIFormProps {
  setOTPInputConfiguration: React.Dispatch<React.SetStateAction<OTPIFormProps>>;
}

const Form: React.FC<FormProps> = ({ setOTPInputConfiguration, inputLength = 4, separatorValue = "", otpValue = "", placeholder = "", inputType = 'number', autoFocus = true, isDisabled = false }) => {
  const handleSubmit = () => alert(`OTP Submitted: ${otpValue}`);
  const setOtpValue = (val:string) => setOTPInputConfiguration(p => ({...p, ["otpValue"]: val}))

  return (
    <div className="otp-form">
      <h2>Enter OTP</h2>
      <OtpInput
        value={otpValue}
        handleOtpValue={setOtpValue}
        inputLength={inputLength}
        separator={<span>{separatorValue}</span>}
        type={inputType}
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        placeholder={placeholder}
      />

      <ResendOTP 
        maxTime={10}
        onResendClick={() => console.log("Resend clicked")}
      />

      <div className="button-group">
        <button className="btn submit" disabled={otpValue.length !== inputLength} onClick={handleSubmit}>Verify</button>
      </div>
    </div>
  );
};

export default Form;
