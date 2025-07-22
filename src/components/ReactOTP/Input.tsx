import React from 'react';

interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    type: string;
    value: string;
    ref?: React.Ref<HTMLInputElement>;
    autoFocus?: boolean;
    isDisabled: boolean;
    index:number;
    placeholder:string;
}

const Input: React.FC<InputProps> = (props) => {
    const { onChange, onKeyDown, onPaste, ref, type,index, value, autoFocus, isDisabled, placeholder } = props;

    return (
        <input
            className='_input-box'
            value={value}
            type={type}
            inputMode={type === "number" ? "numeric" :"text"}
            //pattern={'\d*'}
            //autoFocus={autoFocus}
            autoComplete='off'
            disabled={isDisabled}
            ref={ref}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            aria-label={`Please enter OTP character ${index + 1}`}
            placeholder={placeholder}
        />

    )
}

export default Input