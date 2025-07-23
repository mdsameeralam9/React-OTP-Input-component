# React OTP Input

A customizable, accessible OTP (One-Time Password) input component for React applications built with TypeScript.

## Demo

![OTP Input Normal State](<Screenshot (52).png>)
![OTP Input Filled State](<Screenshot (53).png>)

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
- ♿ Accessibility features for screen readers
- ⏱️ Resend OTP functionality with countdown timer

## Installation

```bash
npm install react-otp-input
# or
yarn add react-otp-input
```

### Development Setup

To run the demo locally:

```bash
git clone https://github.com/yourusername/react-otp-input.git
cd react-otp-input
npm install
npm run dev
```

## Usage

### OTP Input Component

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

### Resend OTP Component

```tsx
import { ResendOTP } from './components/ReactOTP';

function MyComponent() {
  const handleResendClick = () => {
    // Add your resend OTP logic here
    console.log('Resend OTP clicked');
  };

  return (
    <ResendOTP 
      onResendClick={handleResendClick}
      second={30}
      text="Didn't receive the code?"
      btnLabel="Resend OTP"
    />
  );
}
```

## Props

### OTP Input Props

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

### ResendOTP Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onResendClick` | function | `() => {}` | Callback function triggered when the resend button is clicked |
| `second` | number | `10` | Countdown time in seconds before allowing resend |
| `text` | string | `"Didn't receive the otp?"` | Text displayed before the resend button |
| `btnLabel` | string | `"Resend OTP"` | Label for the resend button |

## Detailed Features

### Auto-focus

When `autoFocus` is set to `true`, the first input field will be focused when the component mounts.

### Keyboard Navigation

- Type a digit to fill the current input and move to the next
- Press Backspace to clear the current input and move to the previous
- Navigate between inputs using Tab and Shift+Tab
- Arrow keys (left/right) to move between inputs

### Paste Support

The component supports pasting an OTP code. When pasting, the code will be distributed across the input fields automatically.

### Accessibility

The component is built with accessibility in mind:
- Proper ARIA attributes
- Screen reader friendly
- Keyboard navigable

### Resend OTP Timer

The ResendOTP component provides a countdown timer for OTP resend functionality:
- Displays a countdown timer after initial OTP is sent
- Automatically enables the resend button when the timer reaches zero
- Customizable countdown duration
- Customizable text and button labels

## Demo App
https://react-otp-input-component-alpha.vercel.app/

The repository includes a demo application that showcases all the features of the OTP input component:

- Configure the number of inputs
- Change input types
- Add separators
- Set placeholders
- Test disabled state
- Toggle auto-focus
- Test resend OTP functionality with countdown timer

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
