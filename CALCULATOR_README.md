# 🧮 Advanced Calculator

A modern, feature-rich calculator application built with React, Next.js, and TypeScript. It includes theme switching, beautiful UI with Tailwind CSS, and comprehensive unit testing with Vitest.

## ✨ Features

- **Full Calculator Functionality**
  - Basic arithmetic operations (+, -, *, /)
  - Modulo (%) and sign toggle (+/-)
  - Decimal number support
  - Delete and clear operations
  - Chained operations support

- **Theme Switching**
  - Light and dark themes
  - Theme persistence with localStorage
  - System preference detection
  - Built with React Context API

- **Beautiful UI**
  - Modern gradient backgrounds
  - Responsive design
  - Smooth transitions and animations
  - Color-coded buttons for easy identification

- **Comprehensive Testing**
  - 25 unit tests using Vitest
  - Full coverage of calculator functionality
  - Component rendering tests
  - Edge case handling

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Testing Framework**: Vitest 4.0.18
- **Testing Library**: @testing-library/react
- **State Management**: React Context API

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator in your browser.

## 🧪 Testing

Run all tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test
```

Run tests with UI dashboard:
```bash
npm run test:ui
```

Run tests once (CI mode):
```bash
npm run test:run
```

## 📁 Project Structure

```
app/
├── components/
│   ├── Calculator.tsx          # Main calculator component
│   └── Calculator.test.tsx     # Calculator unit tests (25 tests)
├── context/
│   └── ThemeContext.tsx        # Theme management with React Context
├── layout.tsx                  # Root layout with ThemeProvider
├── page.tsx                    # Home page with theme toggle
└── globals.css                 # Global styles

vitest.config.ts               # Vitest configuration
vitest.setup.ts                # Test setup file
```

## 🧮 Calculator Features in Detail

### Display
- Large, easy-to-read display showing current number
- Handles up to 4 significant digits

### Number Input
- Click buttons 0-9 to input numbers
- Multiple digit support
- Decimal point support (.  button)

### Operations
- **+**: Addition
- **-**: Subtraction
- **×**: Multiplication
- **÷**: Division
- **%**: Modulo/Remainder
- **+/-**: Toggle positive/negative
- **=**: Calculate result
- **AC**: All Clear (reset everything)
- **DEL**: Delete last digit

### Theme System
- Toggle between light and dark themes
- Theme preference saved to localStorage
- Respects system dark mode preference
- Smooth color transitions

## 🎨 UI Design

The calculator features:
- Gradient backgrounds (blue-indigo in light mode, gray in dark mode)
- Color-coded buttons:
  - Red: Clear (AC)
  - Orange: Delete
  - Blue: Operations
  - Green: Equals
  - Purple: Toggle sign
  - Gray: Numbers

## ✅ Test Coverage

The test suite includes:

### Display and Basic Rendering (4 tests)
- Initial display rendering
- All button elements present
- Operation buttons render
- Special buttons render

### Number Input (4 tests)
- Single digit input
- Multiple digit sequential input
- Leading zero prevention
- Zero after other digits

### Decimal Operations (3 tests)
- Decimal point addition
- Multiple decimal point prevention
- Decimal number handling

### Arithmetic Operations (5 tests)
- Addition
- Subtraction
- Multiplication
- Division
- Modulo operation

### Chain Operations (1 test)
- Multiple operations in sequence

### Special Operations (5 tests)
- Clear/Reset functionality
- Delete last digit
- Return to 0 on single digit delete
- Toggle sign functionality
- Toggle sign on negative numbers

### Edge Cases (3 tests)
- Decimal arithmetic
- Negative results
- Reset after equals

**All 25 tests passing! ✅**

## 🔧 Configuration

### Vitest Config
- Environment: jsdom (browser-like)
- Global test utilities enabled
- CSS support for styled components

### Next.js Config
- TypeScript enabled
- Tailwind CSS integrated
- ESLint configured

## 🚀 Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📝 Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting configured
- **Tests**: Comprehensive unit test coverage
- **Components**: Reusable, well-structured components

## 🎯 Future Enhancements

- History/Memory functions
- Scientific calculator mode
- Keyboard support for input
- Copy to clipboard functionality
- More themes

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Next.js, React, and TypeScript
