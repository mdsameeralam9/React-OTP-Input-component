const setOTPValueFromProps = (value: string, inputLength: number) => {
    let state = Array(inputLength).fill("")
    if (!value) return state;
    for (let i = 0; i < inputLength; i++) {
        state[i] = value[i]
    }
    return state;
}

const isValidInputValue = (value: string, type:string="number") => {
    // type = ['number', 'string', 'password', 'mixed'];
    let isValid = type === "number" ? !isNaN(parseInt(value)) : typeof value === 'string';
    return isValid && value.trim().length === 1
}

const keyboardEventsKey = {
  BACK_SPACE_KEY: "Backspace",
  BACK_SPACE_KEY_CODE: 8
}


export { setOTPValueFromProps, isValidInputValue, keyboardEventsKey }