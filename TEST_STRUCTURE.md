# Test Structure Overview

## Test Organization

The calculator tests have been organized into **7 separate test files** for better maintainability and clarity.

### Directory Structure

```
app/components/__tests__/
├── test-utils.tsx                      # Shared test utilities
├── display-rendering.test.tsx          # 4 tests
├── number-input.test.tsx               # 4 tests
├── decimal-operations.test.tsx         # 3 tests
├── arithmetic-operations.test.tsx      # 5 tests
├── special-operations.test.tsx         # 5 tests
├── chain-operations.test.tsx           # 1 test
└── edge-cases.test.tsx                 # 3 tests
```

## Test Breakdown

### 1. **Display & Basic Rendering** (4 tests)
- Initial display rendering
- All number buttons (0-9)
- All operation buttons (+, -, *, /)
- Special buttons (AC, DEL, =, ., +/-, %)

**File**: `display-rendering.test.tsx`

### 2. **Number Input** (4 tests)
- Single digit input
- Multiple digits sequentially
- Leading zero prevention
- Zero after other digits

**File**: `number-input.test.tsx`

### 3. **Decimal Operations** (3 tests)
- Decimal point addition
- Multiple decimal point prevention
- Decimal number handling

**File**: `decimal-operations.test.tsx`

### 4. **Arithmetic Operations** (5 tests)
- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)
- Modulo (%)

**File**: `arithmetic-operations.test.tsx`

### 5. **Special Operations** (5 tests)
- Clear (AC) functionality
- Delete (DEL) last digit
- Return to 0 on single digit delete
- Toggle sign (+/-) 
- Toggle sign on negative numbers

**File**: `special-operations.test.tsx`

### 6. **Chain Operations** (1 test)
- Multiple operations in sequence (e.g., 5 + 3 * 2)

**File**: `chain-operations.test.tsx`

### 7. **Edge Cases** (3 tests)
- Decimal arithmetic (2.5 + 1.5 = 4)
- Negative results (3 - 8 = -5)
- Reset after equals (5 + 3 = 8, then 2 displays 2)

**File**: `edge-cases.test.tsx`

## Shared Utilities

### `test-utils.tsx`

Provides the `renderCalculator()` function that:
- Mocks `localStorage` for theme persistence
- Mocks `matchMedia` for system preference detection
- Wraps Calculator component with `ThemeProvider`
- Sets up proper test environment

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI dashboard
npm run test:ui
```

## Test Results

✅ **All 25 tests passing**

- Test Files: 7 passed
- Tests: 25 passed
- Duration: ~6 seconds

## Benefits of This Structure

1. **Modularity**: Each test file focuses on a specific feature
2. **Maintainability**: Easier to find and update related tests
3. **Clarity**: Test names and files are self-documenting
4. **Scalability**: Easy to add new test categories
5. **Parallel Execution**: Vitest can run independent test files in parallel
6. **Code Reusability**: Shared utilities in `test-utils.tsx`

## Adding New Tests

To add new tests:

1. Determine which category the test belongs to
2. Add test to corresponding file in `__tests__/` directory
3. Ensure test uses `renderCalculator()` from `test-utils.tsx`
4. Run `npm run test:run` to verify

Example:
```tsx
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - New Feature', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should test new feature', () => {
    renderCalculator();
    // Your test here
  });
});
```
