import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { CurrencyConverter } from '@/app/components/CurrencyConverter';
import { ThemeProvider } from '@/app/context/ThemeContext';

/**
 * Test utility setup for CurrencyConverter component
 * Configures mocks and renders the CurrencyConverter with ThemeProvider
 */
export const renderCurrencyConverter = () => {
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

  // Set up default fetch mock for frankfurter.app API
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
