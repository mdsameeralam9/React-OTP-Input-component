import React from 'react';
import type { OTPIFormProps } from '../App';

interface SidebarProps {
    OTPInputConfiguration: OTPIFormProps,
    setOTPInputConfiguration: React.Dispatch<React.SetStateAction<OTPIFormProps>>;
}

const Sidebar: React.FC<SidebarProps> = ({ OTPInputConfiguration, setOTPInputConfiguration }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | {target: {name: string, value: any}}) => {
        let { name, value } = e.target;
        if(name === 'inputLength'){
          value = Number(value);
          if((value < 4 || value > 6)) return;
        }

        if(name === 'otpValue'){
          if((value.length > OTPInputConfiguration?.inputLength!)) return;
        }

        setOTPInputConfiguration((prev) => ({ ...prev, [name]: value }))
    }

    const { 
        inputLength=4,
        inputType= 'number',
        separatorValue= "",
        placeholder,
        otpValue="",
        autoFocus= true,
        isDisabled= false 
    } = OTPInputConfiguration

    return (
        <div className="sidebar">
            <h2>React OTP Input</h2>

            <div className="form-group">
                <label htmlFor="numInputs">numInputs</label>
                <input id="numInputs" value={inputLength} type="number" name="inputLength" placeholder="4" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="inputType">inputType</label>
                <select id="inputType" name='inputType' value={inputType} onChange={handleChange}>
                    <option value="number">number</option>
                    <option value="text">text</option>
                    <option value="password">password</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="separator">separator</label>
                <input id="separator" name='separatorValue' value={separatorValue} onChange={handleChange} type="text" placeholder="-" maxLength={1} />
            </div>


            <div className="form-group">
                <label htmlFor="value">placeholder</label>
                <input id="value" type="text" placeholder="*" maxLength={inputLength || 1} name='placeholder' value={placeholder || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="Value">Value</label>
                <input id="Value" name="otpValue" value={otpValue} onChange={handleChange} type="text" placeholder="1234" />
            </div>

            <div className="form-groupr">
                <label htmlFor="isDisabled">isDisabled</label>
                <input id="isDisabled" name="isDisabled" onChange={(e) => handleChange({target: {name: e.target.name, value: e.target.checked}})} type="checkbox" checked={isDisabled} />
            </div>


            <div className="form-groupr">
                <label htmlFor="autoFocus">autoFocus</label>
                <input id="autoFocus" name="autoFocus" onChange={(e) => handleChange({target: {name: e.target.name, value: e.target.checked}})} type="checkbox" checked={autoFocus} />
            </div>
          
        </div>
    );
};

export default Sidebar;
