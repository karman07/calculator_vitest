# Complete Test Suite Documentation

## Overview

This document provides comprehensive documentation for all 17 test files covering Calculator, Currency Converter, and Redux Counter functionality using Vitest and React Testing Library.

---

## Calculator Tests (7 files)

### 1. Display Rendering Tests (`display-rendering.test.tsx`) - 4 tests

**Purpose**: Tests basic UI rendering and button presence

#### Tests:
- `should render calculator with initial display of 0`
  - Verifies calculator shows "0" on initial load
- `should render all number buttons` 
  - Checks buttons 0-9 exist using `getByTestId('button-${i}')`
- `should render all operation buttons`
  - Verifies +, -, *, / buttons are present
- `should render special buttons`
  - Checks AC, DEL, =, ., ±, % buttons exist

### 2. Number Input Tests (`number-input.test.tsx`) - 4 tests

**Purpose**: Tests digit input functionality

#### Tests:
- `should display single digit when clicked`
  - Clicks button-5, expects display to show "5"
- `should display multiple digits when clicked sequentially`
  - Clicks 1, 2, 3 sequentially, verifies concatenation
- `should not display leading zeros`
  - Clicks 0, 0, 5, expects "5" (not "005")
- `should allow zero after other digits`
  - Clicks 5, 0, expects "50"

### 3. Arithmetic Operations Tests (`arithmetic-operations.test.tsx`) - 5 tests

**Purpose**: Tests mathematical calculations

#### Tests:
- `should perform addition correctly`
  - 5 + 3 = 8: Clicks 5, +, 3, =, expects "8"
- `should perform subtraction correctly`
  - 10 - 3 = 7: Clicks 1, 0, -, 3, =, expects "7"
- `should perform multiplication correctly`
  - 6 * 7 = 42: Clicks 6, *, 7, =, expects "42"
- `should perform division correctly`
  - 20 / 4 = 5: Clicks 2, 0, /, 4, =, expects "5"
- `should perform modulo operation correctly`
  - 10 % 3 = 1: Clicks 1, 0, %, 3, =, expects "1"

### 4. Decimal Operations Tests (`decimal-operations.test.tsx`) - 3 tests

**Purpose**: Tests decimal number handling

#### Tests:
- `should add decimal point`
  - Clicks 5, ., expects "5."
- `should not add multiple decimal points`
  - Clicks 5, ., ., expects single decimal point
- `should handle decimal numbers correctly`
  - Clicks 3, ., 5, expects "3.5"

### 5. Special Operations Tests (`special-operations.test.tsx`) - 5 tests

**Purpose**: Tests special calculator functions

#### Tests:
- `should clear display and state with AC button`
  - After calculations, AC resets to "0"
- `should delete last digit with DEL button`
  - 123 → DEL → "12"
- `should return to 0 when deleting single digit`
  - 5 → DEL → "0"
- `should toggle sign correctly`
  - 5 → ± → "-5"
- `should toggle sign on negative number`
  - -5 → ± → "5"

### 6. Chain Operations Tests (`chain-operations.test.tsx`) - 1 test

**Purpose**: Tests sequential calculations

#### Tests:
- `should handle chained operations`
  - 5 + 3 * 2 = 16 (left-to-right evaluation)

### 7. Edge Cases Tests (`edge-cases.test.tsx`) - 3 tests

**Purpose**: Tests error handling and edge scenarios

#### Tests:
- `should handle decimal arithmetic`
  - 2.5 + 1.5 = 4
- `should handle negative results`
  - 3 - 8 = -5
- `should reset after equals`
  - After calculation, new number starts fresh

---

## Currency Converter Tests (5 files)

### 8. Currency Display Rendering Tests (`currency-display-rendering.test.tsx`) - 8 tests

**Purpose**: Tests UI elements and default values

#### Tests:
- `should render currency converter with title`
- `should render amount input field` (`currency-amount`)
- `should render from currency dropdown` (`from-currency`)
- `should render to currency dropdown` (`to-currency`)
- `should render convert button` (`convert-button`)
- `should render swap button` (`swap-button`)
- `should have default currency values` (USD → INR)
- `should have default amount value` (100)

### 9. Currency Amount Input Tests (`currency-amount-input.test.tsx`) - 4 tests

**Purpose**: Tests amount input validation

#### Tests:
- `should update amount input`
  - Changes input to "500", verifies value
- `should accept decimal amounts`
  - Input "123.45", expects acceptance
- `should accept zero amount`
  - Input "0", expects acceptance
- `should accept large amounts`
  - Input "999999999", expects acceptance

### 10. Currency Selection Tests (`currency-selection.test.tsx`) - 4 tests

**Purpose**: Tests currency dropdown functionality

#### Tests:
- `should change from currency`
  - Changes from USD to EUR
- `should change to currency`
  - Changes to INR to EUR
- `should swap currencies`
  - USD/INR → INR/USD via swap button
- `should include popular currencies`
  - Verifies USD, EUR, INR, GBP, JPY in options

### 11. Currency Conversion Results Tests (`currency-conversion-results.test.tsx`) - 6 tests

**Purpose**: Tests conversion calculations and display

#### Tests:
- `should display conversion result on successful conversion`
- `should display formatted result with 2 decimal places` (8300.46)
- `should display exchange rate` (1 USD = 83 INR)
- `should show error on failed conversion`
- `should show error on network failure`
- `should show loading state during conversion` ("Converting...")

### 12. Currency API Integration Tests (`currency-api-integration.test.tsx`) - 4 tests

**Purpose**: Tests API calls and responses

#### Tests:
- `should call API with correct parameters`
  - Verifies frankfurter.app URL called
- `should use correct currency codes in API call`
  - Checks from=USD&to=INR in URL
- `should handle API response correctly`
  - Processes response to show 8300.00
- `should handle different currency pairs`
  - Tests EUR → GBP conversion

---

## Redux Counter Tests (2 files)

### 13. Counter Slice Tests (`counterSlice.test.ts`) - 6 tests

**Purpose**: Tests Redux reducer logic

#### Tests:
- `should return the initial state`
  - Undefined state → { value: 0 }
- `should handle increment`
  - { value: 0 } + increment() → { value: 1 }
- `should handle decrement`
  - { value: 0 } + decrement() → { value: -1 }
- `should handle incrementByAmount`
  - { value: 0 } + incrementByAmount(5) → { value: 5 }
- `should handle multiple increments`
  - increment() → increment() → { value: 2 }
- `should handle increment then decrement`
  - increment() → decrement() → { value: 0 }

### 14. Counter Component Tests (`counter.test.tsx`) - 7 tests

**Purpose**: Tests React component with Redux integration

#### Tests:
- `should render with initial value of 0`
- `should render with custom initial value` (10)
- `should increment when + button is clicked` (0 → 1)
- `should decrement when - button is clicked` (0 → -1)
- `should increment by 5 when +5 button is clicked` (0 → 5)
- `should handle multiple button clicks` (+ + - = 1)
- `should render all buttons` (-, +, +5)

---

## Test Utilities (3 files)

### 15. Calculator Test Utils (`test-utils.tsx`)

**Purpose**: Provides setup for Calculator component tests

```typescript
export const renderCalculator = () => {
  // Mock localStorage for theme persistence
  const localStorageMock: { [key: string]: string } = {};
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value.toString();
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        Object.keys(localStorageMock).forEach(key => delete localStorageMock[key]);
      }),
    },
    writable: true,
  });

  // Mock matchMedia for dark mode detection
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false, // Default to light mode
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  return render(
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  );
};
```

**Features**:
- **localStorage Mock**: Simulates browser storage for theme persistence
- **matchMedia Mock**: Handles CSS media queries for responsive design
- **ThemeProvider Wrapper**: Provides theme context to Calculator

### 16. Currency Test Utils (`currency-test-utils.tsx`)

**Purpose**: Provides setup for CurrencyConverter component tests

```typescript
export const renderCurrencyConverter = () => {
  // Same localStorage and matchMedia mocks as Calculator
  
  // Mock fetch API for currency conversion
  if (!global.fetch) {
    (global.fetch as any) = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        amount: 1,
        base: 'USD',
        date: '2026-01-29',
        rates: { INR: 83 },
      }),
    });
  }

  return render(
    <ThemeProvider>
      <CurrencyConverter />
    </ThemeProvider>
  );
};
```

**Features**:
- **localStorage Mock**: Theme persistence
- **matchMedia Mock**: Responsive design support
- **Fetch Mock**: Simulates frankfurter.app API responses
- **Default API Response**: USD to INR with rate 83

### 17. Counter Test Utils (`counter-test-utils.tsx`)

**Purpose**: Provides Redux setup for Counter component tests

```typescript
export const renderWithRedux = (initialState = { counter: { value: 0 } }) => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
    preloadedState: initialState,
  });

  return {
    ...render(
      <Provider store={store}>
        <Counter />
      </Provider>
    ),
    store,
  };
};
```

**Features**:
- **Custom Initial State**: Allows testing with different starting values
- **Redux Store**: Creates isolated store for each test
- **Store Access**: Returns store instance for advanced testing
- **Provider Wrapper**: Connects component to Redux

---

## Test Coverage Summary

### Calculator Tests: 25 tests
- Display rendering: 4 tests
- Number input: 4 tests  
- Arithmetic operations: 5 tests
- Decimal operations: 3 tests
- Special operations: 5 tests
- Chain operations: 1 test
- Edge cases: 3 tests

### Currency Converter Tests: 26 tests
- Display rendering: 8 tests
- Amount input: 4 tests
- Currency selection: 4 tests
- Conversion results: 6 tests
- API integration: 4 tests

### Redux Counter Tests: 13 tests
- Reducer logic: 6 tests
- Component interactions: 7 tests

### **Total: 64 tests across 17 files**

---

## Test Commands

```bash
# Run all tests
npm test

# Run specific components
npm test calculator
npm test currency
npm test counter

# Run individual files
npm test display-rendering
npm test counterSlice

# Watch mode
npm test -- --watch
```