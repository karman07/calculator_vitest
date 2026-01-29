import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderCurrencyConverter } from './currency-test-utils';

describe('CurrencyConverter - API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch to default success mock
    (global.fetch as any) = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        result: 8300,
        rate: 83,
      }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call API with correct parameters', async () => {
    renderCurrencyConverter();
    const convertButton = screen.getByTestId('convert-button');

    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('exchangerate.host')
      );
    });
  });

  it('should use correct currency codes in API call', async () => {
    renderCurrencyConverter();
    const convertButton = screen.getByTestId('convert-button');

    fireEvent.click(convertButton);

    await waitFor(() => {
      const callUrl = (global.fetch as any).mock.calls[0][0];
      expect(callUrl).toContain('from=USD');
      expect(callUrl).toContain('to=INR');
      expect(callUrl).toContain('amount=100');
    });
  });

  it('should handle API response correctly', async () => {
    renderCurrencyConverter();
    const convertButton = screen.getByTestId('convert-button');

    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByTestId('result-display')).toBeInTheDocument();
      expect(screen.getByTestId('result-display')).toHaveTextContent('8300.00');
    });
  });

  it('should handle different currency pairs', async () => {
    renderCurrencyConverter();
    const fromSelect = screen.getByTestId('from-currency');
    const toSelect = screen.getByTestId('to-currency');

    // Change from currency (this triggers an API call)
    fireEvent.change(fromSelect, { target: { value: 'EUR' } });

    // Change to currency (this triggers another API call)
    fireEvent.change(toSelect, { target: { value: 'GBP' } });

    await waitFor(() => {
      // Check that the most recent call includes the new currencies
      const lastCallUrl = (global.fetch as any).mock.calls[(global.fetch as any).mock.calls.length - 1][0];
      expect(lastCallUrl).toContain('from=EUR');
      expect(lastCallUrl).toContain('to=GBP');
    }, { timeout: 2000 });
  });
});
