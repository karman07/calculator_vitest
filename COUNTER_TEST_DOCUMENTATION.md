# Complete Test Suite Documentation

## Overview

This document provides comprehensive documentation for all 17 test files in the unit testing project, covering Calculator, Currency Converter, and Redux Counter functionality using Vitest and React Testing Library.

---

## Test Files Summary

### Calculator Tests (7 files)
1. `display-rendering.test.tsx` - Basic rendering and UI elements
2. `number-input.test.tsx` - Number input functionality
3. `arithmetic-operations.test.tsx` - Basic math operations
4. `decimal-operations.test.tsx` - Decimal number handling
5. `special-operations.test.tsx` - Special functions (%, ±, etc.)
6. `chain-operations.test.tsx` - Sequential calculations
7. `edge-cases.test.tsx` - Error handling and edge cases

### Currency Converter Tests (5 files)
8. `currency-display-rendering.test.tsx` - UI rendering
9. `currency-amount-input.test.tsx` - Amount input validation
10. `currency-selection.test.tsx` - Currency dropdown selection
11. `currency-conversion-results.test.tsx` - Conversion calculations
12. `currency-api-integration.test.tsx` - API integration

### Redux Counter Tests (2 files)
13. `counterSlice.test.ts` - Redux reducer logic
14. `counter.test.tsx` - Component interactions

### Test Utilities (3 files)
15. `test-utils.tsx` - Calculator test helpers
16. `currency-test-utils.tsx` - Currency converter helpers
17. `counter-test-utils.tsx` - Redux counter helpers

---

## Detailed Test Documentation

### 1. Display Rendering Tests (`display-rendering.test.tsx`) - 4 tests
- **Test**: `should render calculator with initial display of 0`
- **Test**: `should render all number buttons` (0-9)
- **Test**: `should render all operation buttons` (+, -, *, /)
- **Test**: `should render special buttons` (AC, DEL, =, ., ±, %)

### 2. Number Input Tests (`number-input.test.tsx`) - 4 tests
- **Test**: `should display single digit when clicked`
- **Test**: `should display multiple digits when clicked sequentially`
- **Test**: `should not display leading zeros`
- **Test**: `should allow zero after other digits`

### 3. Arithmetic Operations Tests (`arithmetic-operations.test.tsx`) - 5 tests
- **Test**: `should perform addition correctly` (5 + 3 = 8)
- **Test**: `should perform subtraction correctly` (10 - 3 = 7)
- **Test**: `should perform multiplication correctly` (6 * 7 = 42)
- **Test**: `should perform division correctly` (20 / 4 = 5)
- **Test**: `should perform modulo operation correctly` (10 % 3 = 1)

### 4. Decimal Operations Tests (`decimal-operations.test.tsx`) - 3 tests
- **Test**: `should add decimal point` (5.)
- **Test**: `should not add multiple decimal points`
- **Test**: `should handle decimal numbers correctly` (3.5)

### 5. Special Operations Tests (`special-operations.test.tsx`) - 5 tests
- **Test**: `should clear display and state with AC button`
- **Test**: `should delete last digit with DEL button` (123 → 12)
- **Test**: `should return to 0 when deleting single digit`
- **Test**: `should toggle sign correctly` (5 → -5)
- **Test**: `should toggle sign on negative number` (-5 → 5)

### 6. Chain Operations Tests (`chain-operations.test.tsx`) - 1 test
- **Test**: `should handle chained operations` (5 + 3 * 2 = 16)

### 7. Edge Cases Tests (`edge-cases.test.tsx`) - 3 tests
- **Test**: `should handle decimal arithmetic` (2.5 + 1.5 = 4)
- **Test**: `should handle negative results` (3 - 8 = -5)
- **Test**: `should reset after equals` (5 + 3 = 8, then 2 → 2)

### 8. Currency Display Rendering Tests (`currency-display-rendering.test.tsx`) - 8 tests
- **Test**: `should render currency converter with title`
- **Test**: `should render amount input field`
- **Test**: `should render from currency dropdown`
- **Test**: `should render to currency dropdown`
- **Test**: `should render convert button`
- **Test**: `should render swap button`
- **Test**: `should have default currency values` (USD → INR)
- **Test**: `should have default amount value` (100)

### 9. Currency Amount Input Tests (`currency-amount-input.test.tsx`) - 4 tests
- **Test**: `should update amount input` (500)
- **Test**: `should accept decimal amounts` (123.45)
- **Test**: `should accept zero amount` (0)
- **Test**: `should accept large amounts` (999999999)

### 10. Currency Selection Tests (`currency-selection.test.tsx`) - 4 tests
- **Test**: `should change from currency` (USD → EUR)
- **Test**: `should change to currency` (INR → EUR)
- **Test**: `should swap currencies` (USD/INR → INR/USD)
- **Test**: `should include popular currencies` (USD, EUR, INR, GBP, JPY)

### 11. Currency Conversion Results Tests (`currency-conversion-results.test.tsx`) - 6 tests
- **Test**: `should display conversion result on successful conversion`
- **Test**: `should display formatted result with 2 decimal places` (8300.46)
- **Test**: `should display exchange rate` (1 USD = 83 INR)
- **Test**: `should show error on failed conversion`
- **Test**: `should show error on network failure`
- **Test**: `should show loading state during conversion` (Converting...)

### 12. Currency API Integration Tests (`currency-api-integration.test.tsx`) - 4 tests
- **Test**: `should call API with correct parameters` (frankfurter.app)
- **Test**: `should use correct currency codes in API call` (from=USD&to=INR)
- **Test**: `should handle API response correctly` (8300.00)
- **Test**: `should handle different currency pairs` (EUR → GBP)

### 13. Counter Slice Tests (`counterSlice.test.ts`) - 6 tests
- **Test**: `should return the initial state` ({ value: 0 })
- **Test**: `should handle increment` (0 → 1)
- **Test**: `should handle decrement` (0 → -1)
- **Test**: `should handle incrementByAmount` (0 + 5 = 5)
- **Test**: `should handle multiple increments` (0 → 1 → 2)
- **Test**: `should handle increment then decrement` (0 → 1 → 0)

### 14. Counter Component Tests (`counter.test.tsx`) - 7 tests
- **Test**: `should render with initial value of 0`
- **Test**: `should render with custom initial value` (10)
- **Test**: `should increment when + button is clicked` (0 → 1)
- **Test**: `should decrement when - button is clicked` (0 → -1)
- **Test**: `should increment by 5 when +5 button is clicked` (0 → 5)
- **Test**: `should handle multiple button clicks` (+ + - = 1)
- **Test**: `should render all buttons` (-, +, +5)

---

## Test Utilities Documentation

### 15. Calculator Test Utils (`test-utils.tsx`)
- **Function**: `renderCalculator()`
- **Purpose**: Renders Calculator with ThemeProvider
- **Features**: localStorage mock, matchMedia mock

### 16. Currency Test Utils (`currency-test-utils.tsx`)
- **Function**: `renderCurrencyConverter()`
- **Purpose**: Renders CurrencyConverter with providers
- **Features**: localStorage mock, fetch mock, matchMedia mock

### 17. Counter Test Utils (`counter-test-utils.tsx`)
- **Function**: `renderWithRedux()`
- **Purpose**: Renders Counter with Redux store
- **Features**: Custom initial state, store access

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

# Run specific test suites
npm test calculator
npm test currency
npm test counter

# Run individual test files
npm test display-rendering
npm test counterSlice

# Run tests in watch mode
npm test -- --watch
```