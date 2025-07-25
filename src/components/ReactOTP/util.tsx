const setOTPValueFromProps = (value: string, inputLength: number):string[] => {
    let state = Array(inputLength).fill("")
    if (!value) return state;
    for (let i = 0; i < inputLength; i++) {
        state[i] = value[i] ?? ""
    }
    return state;
}

const initialRemainValue = (seconds:number) => {
  console.log(seconds)
  let remainTime = 0
  if (typeof seconds !== 'number' || !isFinite(seconds) || seconds < 0) {
   if(typeof seconds === 'string'){
     remainTime = parseInt(seconds)
   }
  }
  remainTime = Math.min(Math.max(seconds, 0),3600);
  return remainTime;
};


const getMinutesAndSeconds = (totalSeconds: number): { minutes: number; seconds: number } => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { minutes, seconds };
}

const formattedTime = (time:number):number|string => time > 9 ? time : `0${time}`

const isValidInputValue = (value: string, type: 'number' | 'text' | 'password' = "number") => {
    // type = ['number', 'string', 'password', 'mixed'];
    let isValid = type === "number" ? !isNaN(parseInt(value)) : typeof value === 'string';
    return isValid && value.trim().length === 1
}

const keyboardEventsKey = {
  BACK_SPACE_KEY: "Backspace",
  BACK_SPACE_KEY_CODE: 8
}


export { 
  setOTPValueFromProps, 
  isValidInputValue, 
  keyboardEventsKey, 
  initialRemainValue, 
  getMinutesAndSeconds,
  formattedTime 
}