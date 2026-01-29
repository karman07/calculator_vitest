import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderCurrencyConverter } from './currency-test-utils';

describe('CurrencyConverter - Currency Selection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up fetch mock with default success response
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

  it('should change from currency', async () => {
    renderCurrencyConverter();
    const fromSelect = screen.getByTestId('from-currency') as HTMLSelectElement;

    fireEvent.change(fromSelect, { target: { value: 'EUR' } });

    await waitFor(() => {
      expect(fromSelect.value).toBe('EUR');
    });
  });

  it('should change to currency', async () => {
    renderCurrencyConverter();
    const toSelect = screen.getByTestId('to-currency') as HTMLSelectElement;

    fireEvent.change(toSelect, { target: { value: 'EUR' } });

    await waitFor(() => {
      expect(toSelect.value).toBe('EUR');
    });
  });

  it('should swap currencies', async () => {
    renderCurrencyConverter();
    const fromSelect = screen.getByTestId('from-currency') as HTMLSelectElement;
    const toSelect = screen.getByTestId('to-currency') as HTMLSelectElement;
    const swapButton = screen.getByTestId('swap-button');

    const initialFrom = fromSelect.value;
    const initialTo = toSelect.value;

    fireEvent.click(swapButton);

    await waitFor(() => {
      expect(fromSelect.value).toBe(initialTo);
      expect(toSelect.value).toBe(initialFrom);
    });
  });

  it('should include popular currencies', () => {
    renderCurrencyConverter();
    const fromSelect = screen.getByTestId('from-currency') as HTMLSelectElement;
    const options = Array.from(fromSelect.options).map(opt => opt.value);

    expect(options).toContain('USD');
    expect(options).toContain('EUR');
    expect(options).toContain('INR');
    expect(options).toContain('GBP');
    expect(options).toContain('JPY');
  });
});
