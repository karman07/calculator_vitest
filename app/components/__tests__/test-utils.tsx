import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { Calculator } from '@/app/components/Calculator';
import { ThemeProvider } from '@/app/context/ThemeContext';

/**
 * Test utility setup for Calculator component
 * Configures mocks and renders the Calculator with ThemeProvider
 */
export const renderCalculator = () => {
  // Mock localStorage
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

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
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
