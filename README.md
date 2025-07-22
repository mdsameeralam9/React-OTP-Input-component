# React OTP Input

A customizable, accessible OTP (One-Time Password) input component for React applications built with TypeScript.

React OTP Input Demo
![alt text](<Screenshot.png>)

## Features

- 🔢 Support for variable length OTP codes (4-6 digits)
- 🔄 Multiple input types (number, text, password)
- 🎨 Customizable separators between inputs
- 🔤 Custom placeholders
- ⌨️ Keyboard navigation support
- 📋 Paste functionality
- 🔍 Auto-focus capability
- 🚫 Disable option for read-only mode
- 📱 Mobile-friendly and responsive

## Installation

```bash
npm install
npm run dev
```

## Usage

```tsx
import OtpInput from './components/ReactOTP';

function MyComponent() {
  const [otpValue, setOtpValue] = useState('');

  return (
    <OtpInput
      value={otpValue}
      handleOtpValue={setOtpValue}
      inputLength={4}
      separator={<span>-</span>}
      type="number"
      autoFocus={true}
      isDisabled={false}
      placeholder="*"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | `""` | The current value of the OTP input |
| `handleOtpValue` | function | `() => {}` | Callback function that receives the OTP value when changed |
| `inputLength` | number | `4` | Number of input fields (4-6) |
| `type` | string | `"number"` | Input type: "number", "text", or "password" |
| `isDisabled` | boolean | `false` | Whether the input is disabled |
| `autoFocus` | boolean | `false` | Whether to focus the first input on mount |
| `separator` | ReactNode | `null` | Element to display between inputs |
| `placeholder` | string | `""` | Placeholder text for inputs |

## Features

### Auto-focus

When `autoFocus` is set to `true`, the first input field will be focused when the component mounts.

### Keyboard Navigation

- Type a digit to fill the current input and move to the next
- Press Backspace to clear the current input and move to the previous
- Navigate between inputs using Tab and Shift+Tab

### Paste Support

The component supports pasting an OTP code. When pasting, the code will be distributed across the input fields.

## Demo App

The repository includes a demo application that showcases all the features of the OTP input component:

- Configure the number of inputs
- Change input types
- Add separators
- Set placeholders
- Test disabled state
- Toggle auto-focus

## Development

This project uses:

- React 19
- TypeScript
- Vite

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint