import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Form from './components/Form';
import './App.css';

export interface OTPIFormProps {
  inputLength?:number;
  separatorValue?:string;
  otpValue?:string;
  placeholder?:string;
  inputType?: 'number' | 'text' | 'password';
  autoFocus?:boolean;
  isDisabled?:boolean;
}

function App() {
  const [OTPInputConfiguration, setOTPInputConfiguration] = useState<OTPIFormProps>({
    inputLength: 4,
    otpValue: "",
    separatorValue: "",
    inputType: 'number',
    placeholder: "",
    autoFocus: true,
    isDisabled: false
  });

  return (
    <div className="app-container">
      <Sidebar
        OTPInputConfiguration={OTPInputConfiguration}
        setOTPInputConfiguration={setOTPInputConfiguration}
      />

      <Form
        {...OTPInputConfiguration}
        setOTPInputConfiguration={setOTPInputConfiguration}
      />
    </div>
  );
}

export default App;

