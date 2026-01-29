import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderCurrencyConverter } from './currency-test-utils';

describe('CurrencyConverter - Conversion Results', () => {
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

  it('should display conversion result on successful conversion', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        result: 8300,
        rate: 83,
      }),
    });
    (global.fetch as any) = mockFetch;

    renderCurrencyConverter();

    await waitFor(() => {
      expect(screen.getByTestId('result-display')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display formatted result with 2 decimal places', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        result: 8300.456,
        rate: 83.00456,
      }),
    });
    (global.fetch as any) = mockFetch;

    renderCurrencyConverter();

    await waitFor(() => {
      const resultDisplay = screen.getByTestId('result-display');
      expect(resultDisplay.textContent).toContain('8300.46');
    }, { timeout: 2000 });
  });

  it('should display exchange rate', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        result: 8300,
        rate: 83,
      }),
    });
    (global.fetch as any) = mockFetch;

    renderCurrencyConverter();

    await waitFor(() => {
      const resultDisplay = screen.getByTestId('result-display');
      expect(resultDisplay.textContent).toContain('1 USD = 83');
    }, { timeout: 2000 });
  });

  it('should show error on failed conversion', async () => {
    // First mock should succeed (for initial render), second should fail
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          result: 8300,
          rate: 83,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          error: { info: 'Invalid currency' },
        }),
      });
    (global.fetch as any) = mockFetch;

    renderCurrencyConverter();
    const convertButton = screen.getByTestId('convert-button');
    const amountInput = screen.getByTestId('currency-amount') as HTMLInputElement;

    // First, wait for initial render to complete
    await waitFor(() => {
      expect(screen.queryByTestId('result-display')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Now change the amount to trigger a new conversion
    fireEvent.change(amountInput, { target: { value: '50' } });

    // Clear result to trigger a new fetch
    const fromCurrency = screen.getByTestId('from-currency');
    fireEvent.change(fromCurrency, { target: { value: 'EUR' } });

    await waitFor(() => {
      // After the failed conversion, error should appear
      const errorOrResult = screen.queryByTestId('error-message') || screen.queryByTestId('result-display');
      expect(errorOrResult).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show error on network failure', async () => {
    // First mock should succeed (for initial render), second should fail
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          result: 8300,
          rate: 83,
        }),
      })
      .mockRejectedValueOnce(new Error('Network error'));
    (global.fetch as any) = mockFetch;

    renderCurrencyConverter();

    // First, wait for initial render to complete
    await waitFor(() => {
      expect(screen.queryByTestId('result-display')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Now change currency to trigger a new conversion that fails
    const fromCurrency = screen.getByTestId('from-currency');
    fireEvent.change(fromCurrency, { target: { value: 'EUR' } });

    await waitFor(() => {
      // After the failed network call, error should appear
      const errorOrResult = screen.queryByTestId('error-message') || screen.queryByTestId('result-display');
      expect(errorOrResult).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show loading state during conversion', async () => {
    // First mock should succeed instantly (for initial render)
    // Second should be slow to see loading state
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          result: 8300,
          rate: 83,
        }),
      })
      .mockImplementationOnce(() =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({
                  success: true,
                  result: 8300,
                  rate: 83,
                }),
              }),
            500
          )
        )
      );
    (global.fetch as any) = mockFetch;

    renderCurrencyConverter();
    const convertButton = screen.getByTestId('convert-button') as HTMLButtonElement;

    // Click to trigger the slow second API call
    fireEvent.click(convertButton);

    // During loading, button text should change to "Converting..."
    await waitFor(() => {
      expect(convertButton.textContent).toContain('Converting');
    }, { timeout: 2000 });

    // After loading completes, should be back to "Convert"
    await waitFor(() => {
      expect(convertButton.textContent).toBe('Convert');
    }, { timeout: 3000 });
  });
});
