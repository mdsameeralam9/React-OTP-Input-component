import React, { useState, useRef, useEffect, Fragment } from 'react';
import Input from './Input';
import { isValidInputValue, setOTPValueFromProps, keyboardEventsKey } from './util';
import './style.css';

type AllowedInputTypes = 'number' | 'text' | 'password';

interface OTPInputProps {
  inputLength?: number;
  type?: AllowedInputTypes;
  autoFocus?: boolean;
  value?: string;
  handleOtpValue?: (val: string) => void;
  isDisabled?: boolean;
  separator?: React.ReactNode;
  placeholder?:string
}

const OtpInput: React.FC<OTPInputProps> = (props) => {
  const { 
    value = "",
    handleOtpValue = () => { },
    inputLength = 4,
    type = "number",
    isDisabled = false,
    autoFocus = false,
    separator,
    placeholder
  } = props;

  const [otp, setOtp] = useState(setOTPValueFromProps(value, inputLength)); //Array(inputLength).fill("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      focusInput(0)
    }
  }, [autoFocus])

  // on value change
  useEffect(() => {
    setOtp(setOTPValueFromProps(value, inputLength))
  }, [value, inputLength])

  // focusInput
  function focusInput(index: number) {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus()
    }
  }

  // handleChange
  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    {/**
      const value = (e.target as HTMLInputElement).value; // 1
      const { value } = e.target as HTMLInputElement; // 2
      let typedValue: string | number = value
    */}


    // get last value from input value
    value = value.slice(-1)
    {/**
      //value = value.slice(-1);
      //value = value.substring(value.length-1);
      //value = value[value.length-1];
      value = value.charAt(value.length-1);
    */}

    // validataion
    if (value !== "" && !isValidInputValue(value, type)) {
      return;
    }

    const copyOTP = otp.slice();
    copyOTP[index] = value;
    setOtp(copyOTP);
    const combinedOTP = copyOTP.join("");
    handleOtpValue(combinedOTP)


    // focu input to next
    if (value) {
      // handleOtpValue(copyOTP.join(""))
      if (index < inputLength - 1) focusInput(index + 1);
    }
  }

  // handle keydown to clear the input value when click backspace
  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { BACK_SPACE_KEY, BACK_SPACE_KEY_CODE } = keyboardEventsKey
    const isBackSpace: boolean = e.key === BACK_SPACE_KEY || e.keyCode === BACK_SPACE_KEY_CODE;
    if (isBackSpace && !otp[index] && index > 0) {
      // e.preventDefault();
      focusInput(index - 1)
    }
  }

  // handlePaste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    const data = e.clipboardData.getData('text/plain').slice(0, inputLength).split("");
    const result = Array(inputLength).fill('');
    let lastIndex = 0
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i];
      lastIndex = i
    }
    setOtp(result);
    focusInput(lastIndex)
  }

  return (
      <div className='OtpInput'>
        {otp.map((val, index) => (
          <Fragment key={index} >
            <Input
              value={val}
              type={type}
              ref={(input) => {
                (inputRefs.current[index] = input)
              }}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onPaste={handlePaste}
              isDisabled={isDisabled}
              index={index}
              placeholder={placeholder ? placeholder[index] : undefined}
            />
            {index !== inputLength - 1 && separator ? separator : null}
          </Fragment>
        ))}
      </div>
  )
}

export default OtpInput